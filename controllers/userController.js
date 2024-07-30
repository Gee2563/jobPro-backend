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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,

      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('email:', email);

  const user = await User.findOne({ email });
  console.log('user:', user);

  if (user && (await user.matchPassword(password))) {
    console.log('user matched');
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

//update password for user
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  }
  else {
    res.status(401).json({ message: 'Invalid password' });
  }
}



module.exports = { registerUser, loginUser, updatePassword };
