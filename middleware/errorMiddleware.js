// Handle errors.
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json({ error: err });
};

module.exports = errorHandler;
