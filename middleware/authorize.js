module.exports = (req, res, next) => {
  if (req.authenticatedUser.user_type !== 'admin') {
    return res.status(401).json({
      message: 'Unauthorised',
    })
  }
  next()
}
