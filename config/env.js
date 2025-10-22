const dotenv = require('dotenv');

// Load environment variables from .env (if present)
dotenv.config();

// Helper to trim surrounding whitespace and trailing semicolons
function clean(v) {
  if (typeof v !== 'string') return v;
  return v.trim().replace(/;$/, '').trim();
}

const rawPort = clean(process.env.PORT);
const PORT = rawPort ? Number(rawPort) : 8000;

module.exports = {
  PORT,
  NODE_ENV: clean(process.env.NODE_ENV) || 'development',
  MONGODB_URI: clean(process.env.MONGODB_URI) || '',
};
