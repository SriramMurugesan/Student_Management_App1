/**
 * App Configuration
 */
const config = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = config;
