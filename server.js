const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env (if present)
dotenv.config();

const app = express();

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
