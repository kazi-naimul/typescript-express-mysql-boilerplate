import * as socketIo from 'socket.io';

export const rootSocket = (io: socketIo.Server) => {
    io.on('connection', (socket) => {
        console.log('New connection');
        socket.on('join-new-room', (room) => {
            console.log('join new room', room);
            socket.join(room);
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
            console.log(socket.rooms.size);
        });
    });
    return io;
};
