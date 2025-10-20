const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env (if present)
dotenv.config();

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Request logging using Morgan (console + file)
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logsDir = path.join(__dirname, 'logs');
try { fs.mkdirSync(logsDir, { recursive: true }); } catch (e) {}
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'requests.log'), { flags: 'a' });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));

// Development-only simple logger
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
  });
}

app.get('/', (req, res) => {
  res.send('Our API V1');
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
