const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust the path as needed

// Middleware to check if the user is an admin
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log('Token verified, user:', req.user); // Add logging
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message); // Add logging
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
