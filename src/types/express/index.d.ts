import { IUser } from '../../models/interfaces/IUser';

declare global {
    namespace Express {
        interface Request {
            userInfo?: IUser;
        }
    }
}
