class AppError extends Error { // inherits from Error
  constructor(message, statusCode) {
    super(message); // calls parent constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // operational error i.e not a bug in the code but a user error eg invalid user input
    Error.captureStackTrace(this, this.constructor); // captures the stack trace of the error and stores it in the stack property of the error object
  }
}

module.exports = AppError;
