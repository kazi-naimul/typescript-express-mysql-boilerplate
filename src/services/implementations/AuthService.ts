import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { logger } from '@configs/logger.js';
import TokenDao from '@dao/implementations/TokenDao.js';
import UserDao from '@dao/implementations/UserDao.js';
import responseHandler from '@helpers/responseHandler.js';
import IAuthService from '@services/contracts/IAuthService.js';
import { tokenTypes } from '@configs/tokens.js';
import RedisService from '@services/implementations/RedisService.js';

export default class AuthService implements IAuthService {
    private userDao: UserDao;

    private tokenDao: TokenDao;

    private redisService: RedisService;

    constructor() {
        this.userDao = new UserDao();
        this.tokenDao = new TokenDao();
        this.redisService = new RedisService();
    }

    loginWithEmailPassword = async (email: string, password: string) => {
        try {
            let message = 'Login Successful';
            let statusCode: number = httpStatus.OK;
            let user = await this.userDao.findByEmail(email);
            if (user == null) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Invalid Email Address!'
                );
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            user = user.toJSON();
            delete user.password;

            if (!isPasswordValid) {
                statusCode = httpStatus.BAD_REQUEST;
                message = 'Wrong Password!';
                return responseHandler.returnError(statusCode, message);
            }

            return responseHandler.returnSuccess(statusCode, message, user);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    };

    logout = async (req: Request, res: Response) => {
        const refreshTokenDoc = await this.tokenDao.findOne({
            token: req.body.refresh_token,
            type: tokenTypes.REFRESH,
            blacklisted: false,
        });
        if (!refreshTokenDoc) {
            return false;
        }
        await this.tokenDao.remove({
            token: req.body.refresh_token,
            type: tokenTypes.REFRESH,
            blacklisted: false,
        });
        await this.tokenDao.remove({
            token: req.body.access_token,
            type: tokenTypes.ACCESS,
            blacklisted: false,
        });
        await this.redisService.removeToken(req.body.access_token, 'access_token');
        await this.redisService.removeToken(req.body.refresh_token, 'refresh_token');
        return true;
    };
}
