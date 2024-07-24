const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateToken;
