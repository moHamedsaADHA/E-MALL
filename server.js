const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Our API V1');
});

app.listen(8000, () => {
  console.log('App running');
});
