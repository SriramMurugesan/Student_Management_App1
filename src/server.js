const http = require('http');
const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');
const socketIO = require('./utils/socket');

/**
 * Start the Express Server
 */
const startServer = async () => {
  const PORT = config.PORT;

  // Connect to Database
  await connectDB();

  // Create HTTP Server
  const server = http.createServer(app);

  // Initialize Socket.IO
  socketIO.init(server);

  server.listen(PORT, () => {
    console.log(`
🚀 Server is running!
📡 Environment: ${config.ENV}
🌐 URL: http://localhost:${PORT}
⚡ WebSockets: Enabled
    `);
  });
};

startServer();
