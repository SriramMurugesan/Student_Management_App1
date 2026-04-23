const { Server } = require('socket.io');

let io;

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: '*', // In production, replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });

    io.on('connection', (socket) => {
      console.log('⚡ New client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
