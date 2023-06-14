/* eslint-disable import/no-import-module-exports */
import * as Redis from 'redis';
import { config } from './config';

const url = `redis://${config.redis.host}:${config.redis.port}`;
const redisClient: Redis.RedisClientType = Redis.createClient({ url });
if (config.redis.usePassword.toUpperCase() === 'YES') {
    redisClient.auth(config.redis.password);
}

console.log('Redis Client loaded!!!');
module.exports = redisClient;
