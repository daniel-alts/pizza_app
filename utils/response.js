function errorResponse(res, statusCode, error) {
  const resobj = { statusCode, error };
  return res.status(statusCode).send(resobj );
}

function successResponse(res, statusCode, message, data = []) {
  const resobj = { statusCode, message, data };
  return res.status(statusCode).send({ resobj });
}

function handleError(err, req) {
  console.log(`Error message: ${JSON.stringify(err.message)},
        Error caught at :${JSON.stringify(req.path)}
    `);
}

module.exports = {
    errorResponse,
    successResponse,
    handleError,
}
