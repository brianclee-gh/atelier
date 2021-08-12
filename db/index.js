const { Pool, Client } = require('pg');
const { credentials } = require('./config');


const db = new Client(credentials);

module.exports = { db };
