const jwt = require('jsonwebtoken');

// Middleware to check if the user is an admin or employee
const isEmployee = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ success: false, msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use your JWT secret key from the environment variable
    if (decoded.department == 'Administration') {
      return res.status(403).send({ success: false, msg: 'Access denied: employees only' });
    }
    req.user = decoded; // Attach the decoded token to the request object
    next();
  } catch (error) {
    return res.status(403).send({ success: false, msg: 'Invalid token' });
  }
};

module.exports = isEmployee;

