const express = require('express');
const { PORT, NODE_ENV } = require('./config/env');
const setupLogger = require('./middleware/logger');
const routes = require('./routes');

const app = express();

app.use(express.json());

// Logging middleware
setupLogger(app, NODE_ENV);

// Main routes
app.use('/', routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
