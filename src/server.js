const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

/**
 * Start the Express Server
 */
const startServer = async () => {
  const PORT = config.PORT;

  // Connect to Database
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
🚀 Server is running!
📡 Environment: ${config.ENV}
🌐 URL: http://localhost:${PORT}
    `);
  });
};

startServer();
