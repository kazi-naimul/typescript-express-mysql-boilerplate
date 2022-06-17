import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { userConstant } from '../config/constant';
import ApiError from '../helper/ApiError';

export const hasAccess = (scope) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === userConstant.ROLE_AGENCY_ADMIN) {
        return next();
    }
    if (req.user?.app_features === undefined || !req.user.app_features.includes(scope)) {
        return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
    return next();
};
