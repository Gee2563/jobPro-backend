const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Ensure this is the correct path
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', (req, res, next) => {
  next();
}, loginUser);

// Route to get user info
router.get('/me', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Route to update user password
router.put('/password', authenticateToken, (req, res) => {
  res.send('Update password');
});

module.exports = router;
