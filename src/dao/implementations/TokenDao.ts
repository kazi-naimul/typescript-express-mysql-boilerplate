import models from '../../models';
import ITokenDao from '../contracts/ITokenDao';
import SuperDao from './SuperDao';

const Token = models.token;

export default class TokenDao extends SuperDao implements ITokenDao {
    constructor() {
        super(Token);
    }

    async findOne(where: object) {
        return Token.findOne({ where });
    }

    async remove(where: object) {
        return Token.destroy({ where });
    }
}
