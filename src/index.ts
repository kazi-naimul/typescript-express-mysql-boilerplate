// Elastic APM Start point
// require('elastic-apm-node').start({
//     // Override service name from package.json
//     // Allowed characters: a-z, A-Z, 0-9, -, _, and space
//     serviceName: '',
//
//     // Use if APM Server requires a token
//     secretToken: '',
//
//     // Set custom APM Server URL (default: http://localhost:8200)
//     serverUrl: '',
//
//     // Specify the sampling rate to use when deciding whether to trace a request.
//     transactionSampleRate: '',
//
//     // A boolean specifying if the agent should be active or not. If active,
//     // the agent will instrument incoming HTTP requests and track errors.
//     active: true,
//
//     // The version of the app currently running.
//     serviceVersion: '1.0',
// });

import http from 'http';
import { Server } from 'socket.io';
import { app } from './app';
import { config } from './config/config';
import { rootSocket } from './config/rootSocket';
import { scheduleCronJobs } from './cronJobs';

scheduleCronJobs();

console.log('Hello Local Backend API!!');
// socket initialization
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
    path: '/api/local/v1/socket.io',
});
globalThis.io = io;
// eslint-disable-next-line @typescript-eslint/no-var-requires
rootSocket(io);

server.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
});
