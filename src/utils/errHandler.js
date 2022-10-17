const errorLogger = (
  err,
  req,
  res,
  next
) => {
  console.error('\x1b[31m', err)
  next(err)
}

const errorResponder = (
  err,
  req,
  res,
  next
) => {
  res.header(
    'Content-Type',
    'application/json'
  )
  if (err.name === 'TypeError') {
    res
      .status(401)
      .send({
        message: 'unauthorised access'
      })
  }
  else if (err.name === 'Error') {
    res
      .status(401)
      .send({
        message: 'unauthorised access'
      })
  } else {
    next(err)
  }
}

const invalidPathHandler = (
  err,
  req,
  res,
  next
) => {
  res
    .status(500)
    .send({
      message: `${req.originalUrl} is not a valid path`
    })

  //     console.log(err)
  //   res.locals.error = err
  //   if (
  //     err.status >= 100 &&
  //     err.status < 600
  //   ) {
  //     console.log(err.status)
  //     res.send({
  //       message: `${req.path} is not a valid request`,
  //       status: err.status
  //     })
  //   } else {res.status(500)
  //   res.send({
  //     message: `${req.path} is not a valid path`
  //   })}
}

module.exports = {
  errorLogger,
  errorResponder,
  invalidPathHandler
}
