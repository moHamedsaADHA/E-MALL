const { MongoClient } = require('mongodb');
const { MONGODB_URI } = require('./env');

let client;
let db;

// ready is a promise that resolves when the connection is established (or resolves to null if no URI)
let ready = (async () => {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set — skipping DB connection');
    return null;
  }

  client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db();
  console.log('Connected to MongoDB');
  return db;
})();

function getDb() {
  if (!db) throw new Error('Database not connected');
  return db;
}

async function close() {
  if (client) await client.close();
}

module.exports = { ready, getDb, close };
