// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', (req, res, next) => {
    console.log('Login route hit');
    next();
  }, loginUser);

module.exports = router;
