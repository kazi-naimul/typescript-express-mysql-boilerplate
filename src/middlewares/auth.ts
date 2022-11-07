import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../helper/ApiError';
import { IUser } from '../models/interfaces/IUser';
import { jwtVerifyManually } from '../config/passport';

const verifyCallback =
    (req: Request, res: Response, resolve: any, reject: any) =>
    // eslint-disable-next-line consistent-return
    async (err: any, user: IUser, info: any) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        console.log('user');

        req.userInfo = user;

        resolve();
    };

export const auth = () => async (req: Request, res: Response, next: NextFunction) => {
    new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, res, resolve, reject))(
            req,
            res,
            next
        );
    })
        .then(() => next())
        .catch((err) => {
            next(err);
        });
};

export const authByManuallVerify =
    () => async (req: Request, res: Response, next: NextFunction) => {
        new Promise((resolve, reject) => {
            jwtVerifyManually(req, verifyCallback(req, res, resolve, reject));
        })
            .then(() => next())
            .catch((err) => {
                next(err);
            });
    };
