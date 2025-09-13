const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userSchema } = require('../schemas');
const { ZodError } = require('zod');
const prisma = require('../prisma/client')

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
  throw new Error('Fatal Error: JWT_SECRET is not defined in the environment variables.');
}

//reg
router.post('/register', async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    const hashedPassword = bcrypt.hashSync(password, 10);    
    const isAdmin = email.toLowerCase().includes('admin');

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin,
      },
    });
    
    res.status(201).json({ message : "User registered successfully"});
  } catch(error) {
    if(error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }

    if(error.code == 'P2002') {
      return res.status(409).json({ error : 'An account with this email already exists'});
    }
    res.status(500).json({ error : "An unexpected error occurred." });
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

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
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: "An unexpected error occurred while logging in"});
  }
});

module.exports = router;