const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust the path as needed

// Middleware to check if the user is an admin
const isBranchAdmin  = async (req, res, next) => {
  // try {
  //   const token = req.header('Authorization').replace('Bearer ', '');
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

  //   if (!user || User.department !== 'Administration' || User.branchId.toString() !== req.params.branchId) {
  //     throw new Error();
  //   }

  //   req.user = user;
  //   next();
  // } catch (error) {
  //   res.status(401).send({ error: 'Not authorized to access this resource' });
  // }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ success: false, msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use your JWT secret key from the environment variable

    // Find the user by ID in the database
    const user = await User.findById(decoded.id);

    if (!user || user.department !== 'Administration' || user.branchId.toString() !== req.params.branchId) {
      return res.status(402).send({ success: false, msg: 'Access denied: Admins only' });
    }

    req.user = decoded; // Attach the decoded token to the request object
    next();
  } catch (error) {
    return res.status(403).send({ success: false, msg: 'Invalid token' });
  }




};

module.exports = isBranchAdmin ;
