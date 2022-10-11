module.exports = (req, res, next) => {
  try {
    const authorization = req.get('authorization')

    if (!(authorization && (authorization.toLowerCase().startsWith('bearer') || authorization.toLowerCase().startsWith('basic')))) {
      return res.status(400).json({
        error: 'invalid token',
      })
    }

    if (authorization && authorization.toLowerCase().startsWith('basic ')) {
      req.token = authorization.substring(6)
      return next()
    }

    req.token = authorization.substring(7)
    next()
  } catch (err) {
    next(err)
  }
}
