/* eslint-disable @typescript-eslint/no-shadow */
import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { Request } from 'express';
import { logger } from '@configs/logger.js';
import { userConstant } from '@configs/constant.js';
import UserDao from '@dao/implementations/UserDao.js';
import responseHandler from '@helpers/responseHandler.js';
import { IUser } from '@models/interfaces/IUser.js';
import IUserService from '@services/contracts/IUserService.js';

export default class UserService implements IUserService {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    createUser = async (userBodyReq: IUser) => {
        try {
            const userBody: IUser = userBodyReq;
            let message = 'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }
            if (userBody.password === undefined) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password is required!');
            }
            const uuidValue = uuid();
            userBody.email = userBody.email.toLowerCase();
            userBody.password = bcrypt.hashSync(userBody.password, 8);
            userBody.uuid = uuidValue;
            userBody.status = userConstant.STATUS_ACTIVE;
            userBody.email_verified = userConstant.EMAIL_VERIFIED_FALSE;

            let userData = await this.userDao.create(userBody);

            if (!userData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            userData = userData.toJSON();
            delete userData.password;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    isEmailExists = async (email: string) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getUserByUuid = async (uuid: string) => this.userDao.findOneByWhere({ uuid });

    changePassword = async (req: Request) => {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { password, confirm_password, old_password } = req.body;
            let message = 'Password Successfully Updated!';
            let statusCode: number = httpStatus.OK;
            if (req.userInfo === undefined) {
                return responseHandler.returnError(httpStatus.UNAUTHORIZED, 'Please Authenticate!');
            }
            let user = await this.userDao.findOneByWhere({ uuid: req.userInfo.uuid });

            if (!user) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
            }

            if (password !== confirm_password) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Confirm password not matched'
                );
            }

            const isPasswordValid = await bcrypt.compare(old_password, user.password);
            user = user.toJSON();
            delete user.password;
            if (!isPasswordValid) {
                statusCode = httpStatus.BAD_REQUEST;
                message = 'Wrong old Password!';
                return responseHandler.returnError(statusCode, message);
            }
            const updateUser = await this.userDao.updateWhere(
                { password: bcrypt.hashSync(password, 8) },
                { uuid: user.uuid }
            );

            if (updateUser) {
                return responseHandler.returnSuccess(
                    httpStatus.OK,
                    'Password updated Successfully!',
                    {}
                );
            }

            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
        } catch (e) {
            console.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
        }
    };
}
