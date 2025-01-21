const express = require('express');
const bcrypt = require('bcryptjs'); // Corrected bcrypt import
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = 'secret'; // Secret key for JWT

// User registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user and save to the database
    const user = new User({ username, email, password });
    await user.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    // Return the token and user details
    res.status(201).json({ token, user: { id: user._id, username, email } });

  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1w' });

    // Send response with token and user info
    res.json({
      token,
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ msg: 'Error logging in', error: error.message });
  }
});

module.exports = router;
