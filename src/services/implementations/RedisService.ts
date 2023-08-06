import IRedisService from '@services/contracts/IRedisService.js';
import redisClient from '@configs/redisClient.js';
import RedisHelper from '@helpers/RedisHelper.js';
import { IUser } from '@models/interfaces/IUser.js';
import { config } from '@configs/config.js';

export default class RedisService implements IRedisService {
    private redisHelper: RedisHelper;

    constructor() {
        this.redisHelper = new RedisHelper(redisClient);
    }

    createTokens = async (
        uuid: string,
        tokens: { access: { token: string }; refresh: { token: string } }
    ) => {
        const accessKey = `access_token:${tokens.access.token}`;
        const refreshKey = `refresh_token:${tokens.refresh.token}`;
        const accessKeyExpires = config.jwt.accessExpirationMinutes * 60;
        const refreshKeyExpires = config.jwt.refreshExpirationDays * 24 * 60 * 60;
        await this.redisHelper.setEx(accessKey, accessKeyExpires, uuid);
        await this.redisHelper.setEx(refreshKey, refreshKeyExpires, uuid);
        return true;
    };

    hasToken = async (token: string, type = 'access_token') => {
        const hasToken = await this.redisHelper.get(`${type}:${token}`);
        if (hasToken != null) {
            return true;
        }
        return false;
    };

    removeToken = async (token: string, type = 'access_token') =>
        this.redisHelper.del(`${type}:${token}`);

    getUser = async (uuid: string) => {
        const user = await this.redisHelper.get(`user:${uuid}`);
        if (user != null) {
            return JSON.parse(user);
        }
        return false;
    };

    setUser = async (user: IUser) => {
        const setUser = await this.redisHelper.set(`user:${user.uuid}`, JSON.stringify(user));
        if (!setUser) {
            return true;
        }
        return false;
    };
}
