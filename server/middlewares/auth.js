const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decodedToken;

    // Call next middleware function
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware to prevent logged-in users from logging in or signing up again
const preventLoggedInUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
          return res.status(403).json({ message: 'You are already logged in.' });
        }
      } catch (err) {
        return next(err);
      }
    }
    next();
  }

module.exports = { requireAuth, preventLoggedInUser };
