// An inheriatance fn for all our err fn to take.

class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

		// Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
