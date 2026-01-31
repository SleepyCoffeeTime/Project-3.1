const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

const optionalAuth = (req, res, next) => {
  next();
};

module.exports = {
  requireAuth,
  optionalAuth
};