const dotenv = require('dotenv');

// Load environment variables from .env (if present)
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || '',
};
