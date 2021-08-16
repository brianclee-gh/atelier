const pgp = require('pg-promise')();
const { credentials } = require('./config');

const db = pgp(credentials);

module.exports = { db };
