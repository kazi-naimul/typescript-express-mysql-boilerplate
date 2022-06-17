import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import httpStatus from 'http-status';
import { config } from '../config/config';
import ApiError from '../helper/ApiError';

const verifyUser = async (req: Request) => {
    if (req.headers.authorization === undefined) {
        return false;
    }
    const headers = {
        Authorization: req.headers.authorization,
    };
    return axios
        .get(`${config.accountServerApiBaseUrl}auth/verify-user/${config.appIdentifier}`, {
            headers,
        })
        .then((res) => {
            if (res.status === 200) {
                return res.data;
            }
            return false;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const auth =
    () =>
    // eslint-disable-next-line consistent-return
    async (req: Request, res: Response, next: NextFunction) => {
        const userResponse = await verifyUser(req);
        if (userResponse && userResponse.data !== undefined) {
            req.user = userResponse.data;
            return next();
        }
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    };
