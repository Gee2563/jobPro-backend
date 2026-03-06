// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('registerUser error:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('loginUser error:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
};

//update password for user
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      return res.json({ message: 'Password updated successfully' });
    }

    return res.status(401).json({ message: 'Invalid password' });
  } catch (error) {
    console.error('updatePassword error:', error);
    return res.status(500).json({ message: 'Password update failed' });
  }
};

module.exports = { registerUser, loginUser, updatePassword };
