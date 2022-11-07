import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { addDays, addMinutes, getUnixTime } from 'date-fns';
import { tokenTypes } from '../../config/tokens';
import TokenDao from '../../dao/implementations/TokenDao';
import ITokenService from '../contracts/ITokenService';
import RedisService from './RedisService';
import { config } from '../../config/config';
import { IUser } from '../../models/interfaces/IUser';
import { parseTime } from '../../helper/timeHelper';
import { IToken } from '../../models/interfaces/IToken';

export default class TokenService implements ITokenService {
    private tokenDao: TokenDao;

    private redisService: RedisService;

    constructor() {
        this.tokenDao = new TokenDao();
        this.redisService = new RedisService();
    }

    generateToken = (uuid: string, expires: Date, type: string, secret = config.jwt.secret) => {
        const payload = {
            sub: uuid,
            iat: getUnixTime(new Date()),
            exp: getUnixTime(parseTime(expires)),
            type,
        };
        return jwt.sign(payload, secret);
    };

    verifyToken = async (token: string, type: string) => {
        const payload: any = await jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                throw new Error('Token not found');
            } else {
                // if everything is good, save to request for use in other routes
                return decoded;
            }
        });

        const tokenDoc: IToken = await this.tokenDao.findOne({
            token,
            type,
            user_uuid: payload.sub,
            blacklisted: false,
        });
        if (!tokenDoc) {
            throw new Error('Token not found');
        }
        return tokenDoc;
    };

    saveToken = async (
        token: string,
        userId: number,
        expires: Date,
        type: string,
        blacklisted = false
    ) =>
        this.tokenDao.create({
            token,
            user_id: userId,
            expires,
            type,
            blacklisted,
        });

    saveMultipleTokens = async (tokens: object[]) => this.tokenDao.bulkCreate(tokens);

    removeTokenById = async (id: number) => this.tokenDao.remove({ id });

    generateAuthTokens = async (user: IUser) => {
        const accessTokenExpires: Date = addMinutes(new Date(), config.jwt.accessExpirationMinutes);
        const accessToken = await this.generateToken(
            user.uuid,
            accessTokenExpires,
            tokenTypes.ACCESS
        );
        const refreshTokenExpires: Date = addDays(new Date(), config.jwt.refreshExpirationDays);
        const refreshToken = await this.generateToken(
            user.uuid,
            refreshTokenExpires,
            tokenTypes.REFRESH
        );
        const authTokens: IToken[] = [];
        authTokens.push({
            token: accessToken,
            user_uuid: user.uuid,
            expires: accessTokenExpires,
            type: tokenTypes.ACCESS,
            blacklisted: false,
        });
        authTokens.push({
            token: refreshToken,
            user_uuid: user.uuid,
            expires: refreshTokenExpires,
            type: tokenTypes.REFRESH,
            blacklisted: false,
        });

        await this.saveMultipleTokens(authTokens);
        const expiredAccessTokenWhere = {
            expires: {
                [Op.lt]: new Date(),
            },
            type: tokenTypes.ACCESS,
        };
        await this.tokenDao.remove(expiredAccessTokenWhere);
        const expiredRefreshTokenWhere = {
            expires: {
                [Op.lt]: new Date(),
            },
            type: tokenTypes.REFRESH,
        };
        await this.tokenDao.remove(expiredRefreshTokenWhere);
        const tokens = {
            access: {
                token: accessToken,
                expires: accessTokenExpires,
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires,
            },
        };
        await this.redisService.createTokens(user.uuid, tokens);

        return tokens;
    };
}
