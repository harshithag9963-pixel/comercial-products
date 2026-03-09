const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connection');

const router = express.Router();

function getJwtSecret() {
  // Deployment-ready default for beginners, but you SHOULD set JWT_SECRET in Render.
  return process.env.JWT_SECRET || 'dev_secret_change_me';
}

function pickUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, password are required' });
    }
    if (String(password).length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE LOWER(email)=LOWER($1)', [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(String(password), 10);
    const created = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password_hash]
    );

    const user = pickUser(created.rows[0]);
    const token = jwt.sign(user, getJwtSecret(), { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const found = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE LOWER(email)=LOWER($1) LIMIT 1',
      [email]
    );
    if (found.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const row = found.rows[0];
    const ok = await bcrypt.compare(String(password), row.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const user = pickUser(row);
    const token = jwt.sign(user, getJwtSecret(), { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;

