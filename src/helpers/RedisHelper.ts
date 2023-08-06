import { RedisClientType } from '@redis/client';

export default class RedisHelper {
    redisClient: RedisClientType;

    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    set = async (key: string, valueParam: string | object) => {
        try {
            let value: string | object = valueParam;
            if (typeof value === 'object') value = JSON.stringify(value);
            return await this.redisClient.set(key, value);
        } catch (e) {
            return false;
        }
    };

    setEx = async (key: string, seconds: number, valueParam: string | object) => {
        try {
            let value: string | object = valueParam;
            if (typeof value === 'object') value = JSON.stringify(value);
            return await this.redisClient.setEx(key, seconds, value);
        } catch (e) {
            return false;
        }
    };

    get = async (key: string) => {
        try {
            return await this.redisClient.get(key);
        } catch (e) {
            return null;
        }
    };

    del = async (key: string) => {
        try {
            return await this.redisClient.del(key);
        } catch (e) {
            return false;
        }
    };
}
