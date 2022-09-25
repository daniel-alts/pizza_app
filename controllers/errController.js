const handleError = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		// err: err,
		stack: err.stack,
	});
};

module.exports = (err, req, res, next) => {
	// console.log(err);
	return handleError(err, res);
};
