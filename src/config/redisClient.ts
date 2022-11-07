/* eslint-disable import/no-import-module-exports */
import * as Redis from 'redis';
import { config } from './config';

const url = `redis://${config.redis.host}:${config.redis.port}`;
const client: Redis.RedisClientType = Redis.createClient({ url });
if (config.redis.usePassword.toUpperCase() === 'YES') {
    client.auth(config.redis.password);
}

console.log('Redis Client loaded!!!');
module.exports = client;
