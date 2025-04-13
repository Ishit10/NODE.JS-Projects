const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  const publicRoutes = ['/login', '/register'];

  // Skip auth for login and register pages
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const token = req.cookies?.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    res.locals.user = user; // So views can access it
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

// Role-based middleware
exports.admin = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
};
