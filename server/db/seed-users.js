require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { pool } = require('./connection');

const DEMO_EMAIL = 'demo@commercial.test';
const DEMO_PASSWORD = 'Demo1234!';
const DEMO_NAME = 'Demo User';

async function seedUsers() {
  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE LOWER(email)=LOWER($1) LIMIT 1',
      [DEMO_EMAIL]
    );
    if (existing.rows.length > 0) {
      console.log('✓ Demo user already exists. Skipping.');
      process.exit(0);
      return;
    }

    const password_hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
      [DEMO_NAME, DEMO_EMAIL, password_hash]
    );

    console.log('✓ Seeded demo user');
    console.log(`  Email: ${DEMO_EMAIL}`);
    console.log(`  Password: ${DEMO_PASSWORD}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding users:', err.message);
    process.exit(1);
  }
}

seedUsers();

