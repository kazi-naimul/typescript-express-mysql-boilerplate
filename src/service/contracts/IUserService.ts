import { Request } from 'express';
import { ApiServiceResponse } from '../../@types/apiServiceResponse';
import { IUser } from '../../models/interfaces/IUser';

export default interface IUserService {
    createUser: (userBody: IUser) => Promise<ApiServiceResponse>;
    isEmailExists: (email: string) => Promise<ApiServiceResponse>;
    getUserByUuid: (uuid: string) => Promise<IUser>;
    changePassword: (req: Request) => Promise<ApiServiceResponse>;
}
