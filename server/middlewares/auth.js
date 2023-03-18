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

module.exports = { requireAuth };
