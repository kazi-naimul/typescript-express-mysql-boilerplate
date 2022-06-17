import * as socketIo from 'socket.io';

export const rootSocket = (io: socketIo.Server) => {
    io.on('connection', (socket) => {
        console.log('New connection');
        socket.on('join-location-room', (room) => {
            console.log('join room for Location', room);
            socket.join(room);
        });

        socket.on('join-grid-room', (room) => {
            console.log('join room for Grid', room);
            socket.join(room);
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
            console.log(socket.rooms.size);
        });
    });
    return io;
};
