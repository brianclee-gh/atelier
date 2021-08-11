const { Pool, Client } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: '',
  port: 5432,
};

// async function poolDemo() {
//   const pool = new Pool(credentials);
//   const now = await pool.query('SELECT NOW()');
//   await pool.end();

//   return now;
// }

const db = new Client(credentials);

module.exports = { db };
