import { IToken } from '../../models/interfaces/IToken';

export default interface ITokenDao {
    findOne: (where: object) => Promise<IToken>;
    remove: (where: object) => Promise<boolean>;
}
