import { Request, Response } from 'express';
import { ApiServiceResponse } from '../../@types/apiServiceResponse';

export default interface IAuthService {
    loginWithEmailPassword: (email: string, password: string) => Promise<ApiServiceResponse>;
    logout: (req: Request, res: Response) => Promise<boolean>;
}
