import { ApiServiceResponse } from "../../@types/apiServiceResponse";
import { IUser } from "../../models/interfaces/IUser";

export default interface IUserService {
    createUser: (userBody: object) => Promise<ApiServiceResponse>;
    isEmailExists: (email: string) => Promise<ApiServiceResponse>;
    getUserByUuid: (uuid: string) => Promise<IUser>;
    changePassword: (data: object, uuid: string) => Promise<ApiServiceResponse>;
}