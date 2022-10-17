/**
 * Error handler middleware
 */
module.exports = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Unable to lookup order with provided ID' })
  }

  return res.status(500).send({ error: 'Sorry, error occured' })
}
