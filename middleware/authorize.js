module.exports = (req, res, next) => {
  if (req.authenticatedUser === null || req.authenticatedUser.user_type !== 'admin') {
    return res.status(401).json({
      error: 'Unauthorised',
    })
  }
  next()
}
