import { IToken } from '../../models/interfaces/IToken';
import { IUser } from '../../models/interfaces/IUser';

export default interface ITokenService {
    generateToken: (uuid: string, expires: Date, type: string, secret: string) => string;
    verifyToken: (token: string, type: string) => Promise<IToken>;
    saveToken: (
        token: string,
        userId: number,
        expires: Date,
        type: string,
        blacklisted: boolean
    ) => Promise<IToken>;
    saveMultipleTokens: (tokens: object[]) => Promise<boolean>;
    removeTokenById: (id: number) => Promise<boolean>;
    generateAuthTokens: (user: IUser) => Promise<object>;
}
