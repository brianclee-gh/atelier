const { Pool } = require('pg');
const { credentials } = require('./config');

const pool = new Pool(credentials);

module.exports = { pool };

//sudo launchctl limit maxfiles 40480 28000