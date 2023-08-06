import http from 'http';
import { Server } from 'socket.io';
import { rootSocket } from '@configs/rootSocket.js';
import { config } from '@configs/config.js';
import { app } from './app.js';
import { scheduleCronJobs } from './cronJobs.js';

scheduleCronJobs();

console.log('Hello Typescript Express API!!');
// socket initialization
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
    path: '/api/v1/socket.io',
});
globalThis.io = io;
// eslint-disable-next-line @typescript-eslint/no-var-requires
rootSocket(io);

server.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
});
