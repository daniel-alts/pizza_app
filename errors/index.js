const CustomAPIError = require('./custom-api');
const UnauthenticatedError = require('./unauthenticated');
const BadRequestError = require('./bad-request');
const UnauthorizedError = require('./unauthorized');

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
    UnauthorizedError,
};