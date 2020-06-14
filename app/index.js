const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes/erase.router'));
app.use(require('./routes/trades.router'));
app.use(require('./routes/stocks.router'));

mongoose.connect('mongodb://localhost:27017/stock', 
                  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
                  (err, resp) => {
  if ( err ) throw err;
  console.log('Database is ONLINE');
});

app.listen(port, () => {
  console.log('Listening on port', port);
});