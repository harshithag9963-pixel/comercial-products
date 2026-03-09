require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./connection');

const createProductsTableSQL = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createUsersTableSQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function setup() {
  try {
    await pool.query(createProductsTableSQL);
    await pool.query(createUsersTableSQL);
    console.log('✓ Tables created successfully (products, users)');
    process.exit(0);
  } catch (err) {
    console.error('Error setting up database:', err.message);
    process.exit(1);
  }
}

setup();
