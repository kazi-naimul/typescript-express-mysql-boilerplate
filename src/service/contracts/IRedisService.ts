import { IUser } from '../../models/interfaces/IUser';

export default interface IRedisService {
    createTokens: (
        uuid: string,
        tokens: { access: { token: string }; refresh: { token: string } }
    ) => Promise<boolean>;
    hasToken: (token: string, type: string) => Promise<boolean>;
    removeToken: (token: string, type: string) => Promise<number | boolean>;
    getUser: (uuid: string) => Promise<boolean>;
    setUser: (user: IUser) => Promise<boolean>;
}
