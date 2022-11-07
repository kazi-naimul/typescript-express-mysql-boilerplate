import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiServiceResponse } from '../@types/apiServiceResponse';
import { logger } from '../config/logger';
import { tokenTypes } from '../config/tokens';
import { IUser } from '../models/interfaces/IUser';
import AuthService from '../service/implementations/AuthService';
import TokenService from '../service/implementations/TokenService';
import UserService from '../service/implementations/UserService';

export default class AuthController {
    private userService: UserService;

    private tokenService: TokenService;

    private authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const user: ApiServiceResponse = await this.userService.createUser(req.body);
            let tokens = {};
            const { status } = user.response;
            if (user.response.status) {
                tokens = await this.tokenService.generateAuthTokens(<IUser>user.response.data);
            }
            const { message, data } = user.response;
            res.status(user.statusCode).send({ status, message, data, tokens });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    checkEmail = async (req: Request, res: Response) => {
        try {
            const isExists = await this.userService.isEmailExists(req.body.email.toLowerCase());
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.loginWithEmailPassword(
                email.toLowerCase(),
                password
            );
            const { message, data, status } = user.response;
            const code = user.statusCode;
            let tokens = {};
            if (user.response.status) {
                tokens = await this.tokenService.generateAuthTokens(<IUser>data);
            }
            res.status(user.statusCode).send({ status, code, message, data, tokens });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    logout = async (req: Request, res: Response) => {
        await this.authService.logout(req, res);
        res.status(httpStatus.NO_CONTENT).send();
    };

    refreshTokens = async (req: Request, res: Response) => {
        try {
            const refreshTokenDoc = await this.tokenService.verifyToken(
                req.body.refresh_token,
                tokenTypes.REFRESH
            );
            const user = await this.userService.getUserByUuid(refreshTokenDoc.user_uuid);
            if (user == null) {
                res.status(httpStatus.BAD_GATEWAY).send('User Not Found!');
            }
            if (refreshTokenDoc.id === undefined) {
                return res.status(httpStatus.BAD_GATEWAY).send('Bad Request!');
            }
            await this.tokenService.removeTokenById(refreshTokenDoc.id);
            const tokens = await this.tokenService.generateAuthTokens(user);
            res.send(tokens);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    changePassword = async (req: Request, res: Response) => {
        try {
            const responseData = await this.userService.changePassword(req);
            res.status(responseData.statusCode).send(responseData.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}
