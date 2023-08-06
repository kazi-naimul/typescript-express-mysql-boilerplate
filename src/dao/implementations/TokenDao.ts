import models from '@models/index.js';
import ITokenDao from '@dao/contracts/ITokenDao.js';
import SuperDao from './SuperDao.js';

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
