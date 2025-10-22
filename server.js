const { MONGODB_URI } = require('./config/env');
const mongoose = require('mongoose');
const express = require('express');
const { PORT, NODE_ENV } = require('./config/env');
const morgan = require('morgan');
// const setupLogger = require('./middleware/logger');
const routes = require('./routes');

const app = express();

app.use(express.json());

// middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Morgan enabled for logging HTTP requests: ${process.env.NODE_ENV}`);
} 

//create schema
const categorySchema = new mongoose.Schema({
  name: String,
  description: String
});
//create model
const Category = mongoose.model('Category', categorySchema);



//connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose connected to MongoDB'))
  .catch(err => console.error('Mongoose connection error:', err));



// Main routes
app.use('/', routes);

app.post('/categories', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
    console.log(name);
  }
  catch (err) {
    // console.log(name);
    // console.error('Error creating category:', err);
    next(err);
  }
});


// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const db = require('./config/db');

async function start() {
  try {
    // Wait for the DB module to initialize itself (no duplicate connect calls)
    // but don't let a slow/failed native MongoClient connection block the server forever.
    // Race the real db.ready against a short timeout so the app can still start.
    const dbInit = Promise.race([
      db.ready,
      new Promise((resolve) => setTimeout(() => resolve(null), 5000))
    ]);

    await dbInit;
    console.log('DB ready (if configured) or timed out after 5s');
  } catch (err) {
    console.warn('DB initialization failed:', err && err.message ? err.message : err);
  }

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

start();
