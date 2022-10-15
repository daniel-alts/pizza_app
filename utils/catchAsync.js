const AppError = require('./AppError');

module.exports = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) =>
			next(new AppError(err.message, 401)),
		);
	};
};
