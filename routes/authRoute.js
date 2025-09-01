const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { userSchema } = require('../schemas');

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
  throw new Error('Fatal Error: JWT_SECRET is not defined in the environment variables.');
}

//reg
router.post('/register', (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const stmt = db.prepare('INSERT INTO users (email, password, is_admin) VALUES (?, ?, ?)');
    
    const isAdmin = email.toLowerCase().includes('admin') ? 1 : 0;

    stmt.run(email, password, isAdmin);

    res.status(201).json({ message : "User registered successfully"});
  } catch(error) {
    if(error.code == 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error : 'An account with this email already exists'});
    }
    res.status(400).json({ error : error.message });
  }
});

//login
router.post('/login', (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);

    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);

    if(user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin === 1,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;