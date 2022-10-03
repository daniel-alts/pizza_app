function errorResponse(
    res,
    statusCode,
    error
) {
    const responseObject = { statusCode, error };
    return res.status(statusCode).send(responseObject);
}

function successResponse(
    res,
    statusCode,
    message,
    data = [],
) {
    const responseObject = { statusCode, message, data };
    return res.status(statusCode).send(responseObject);
}

const handleError = (err, req) => {
    console.log(`
    Error caught at ${req.path}, 
      Request body: ${JSON.stringify(req.body)},
      Request User: ${JSON.stringify(req.user)},
      Request Params: ${JSON.stringify(req.params)}
      Request Query: ${JSON.stringify(req.query)}
      Error Message: ${JSON.stringify(err.message)}
      Error Logs: ${JSON.stringify(err.stack)}
    `);
};

module.exports = { errorResponse, successResponse, handleError };