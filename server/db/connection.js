const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const isRenderDb = connectionString?.includes('render.com');

const pool = new Pool({
  connectionString,
  ssl: isRenderDb ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
  } finally {
    client.release();
  }
}

module.exports = { pool, testConnection };
