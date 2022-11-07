import { IUser } from '../../models/interfaces/IUser';

export default interface IUserDao {
    findByEmail: (email: string) => Promise<IUser>;
    isEmailExists: (email: string) => Promise<boolean>;
    createWithTransaction: (user: object, transaction: object) => Promise<IUser>;
}
