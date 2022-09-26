/** Access Control Authorization */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    res.status(500).json({ status: false, error: 'Internal server error' })
  }
  
  if (!roles.includes(req.user.user_type)) {
    return res.json({ status: false, error: 'Cannot access this resource' })
  }

  next()
}

module.exports = requireRole