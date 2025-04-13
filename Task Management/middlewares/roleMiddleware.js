module.exports = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send('Access Denied');
    next();
  };