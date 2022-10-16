/**
 * Error handler middleware
 */
module.exports = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'Unable to lookup order with provided ID',
    })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({
      error: 'invalid token',
    })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(400).json({
      error: 'token expired',
    })
  }

  res.status(400).json({
    error: error.message,
  })

  next()
}
