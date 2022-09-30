// Handle asynchronous error using error middleware
function errorMiddleware(error, req, res, next) {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error('Error: ', error)
   
    if (error.type == 'Redirect')
        res.redirect('error.html')
     else if (error.type == 'Not Found') // arbitrary condition check
        res.status(404).send(error)
    else {
        res.status(500).send(error)
    }

    next(error) // next is required to call next middleware if any
}

module.exports = errorMiddleware 