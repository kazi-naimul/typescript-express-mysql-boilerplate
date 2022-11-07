import { Strategy, ExtractJwt, VerifyCallbackWithRequest, StrategyOptions } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import UserDao from '../dao/implementations/UserDao';
import { config } from './config';
import { tokenTypes } from './tokens';
import TokenDao from '../dao/implementations/TokenDao';
import RedisService from '../service/implementations/RedisService';
import models from '../models';

const User = models.user;
const jwtOptions: StrategyOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
};

const jwtVerify: VerifyCallbackWithRequest = async (req, payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const userDao = new UserDao();
        const tokenDao = new TokenDao();
        const redisService = new RedisService();
        const authorization =
            req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];
        if (authorization[1] === undefined) {
            return done(null, false);
        }
        let tokenDoc = redisService.hasToken(authorization[1], 'access_token');
        if (!tokenDoc) {
            tokenDoc = await tokenDao.findOne({
                token: authorization[1],
                type: tokenTypes.ACCESS,
                blacklisted: false,
            });
        }

        if (!tokenDoc) {
            return done(null, false);
        }
        let user = await redisService.getUser(payload.sub);
        if (user) {
            user = new User(user);
        }

        if (!user) {
            console.log('User Cache Missed!');
            user = await userDao.findOneByWhere({ uuid: payload.sub });
            redisService.setUser(user);
        }

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};
const jwtVerifyManually = async (req, done) => {
    try {
        const authorization =
            req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];
        if (authorization[1] === undefined) {
            return done(null, false);
        }
        const payload: any = await jwt.verify(
            authorization[1],
            config.jwt.secret,
            (err, decoded) => {
                if (err) {
                    throw new Error('Token not found');
                }
                // if everything is good, save to request for use in other routes
                return decoded;
            }
        );

        const userDao = new UserDao();
        const tokenDao = new TokenDao();
        const redisService = new RedisService();

        let tokenDoc = redisService.hasToken(authorization[1], 'access_token');
        if (!tokenDoc) {
            console.log('Cache Missed!');
            tokenDoc = await tokenDao.findOne({
                token: authorization[1],
                type: tokenTypes.ACCESS,
                blacklisted: false,
            });
        }

        if (!tokenDoc) {
            return done(null, false);
        }
        let user = await redisService.getUser(payload.sub);
        if (user) {
            user = new User(user);
        }

        if (!user) {
            console.log('User Cache Missed!');
            user = await userDao.findOneByWhere({ uuid: payload.sub });
            redisService.setUser(user);
        }

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export { jwtStrategy, jwtVerifyManually };
