import IUserDao from '@dao/contracts/IUserDao.js';
import models from '@models/index.js';
import SuperDao from './SuperDao.js';

const User = models.user;

export default class UserDao extends SuperDao implements IUserDao {
    constructor() {
        super(User);
    }

    async findByEmail(email: string) {
        return User.findOne({ where: { email } });
    }

    async isEmailExists(email: string) {
        return User.count({ where: { email } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }

    async createWithTransaction(user: object, transaction: object) {
        return User.create(user, { transaction });
    }
}
