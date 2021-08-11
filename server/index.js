const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const router = require('./routes');
const { db } = require('../db/index');

const app = express();
module.exports.app = app;

const PORT = 8080;
app.set('port', PORT);

app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) {
    console.log('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
