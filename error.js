exports.BrokenCode = (res) => {
    res.status(500).json({
        status: false,
        message: 'Something Went Wrong!'
    })
}

exports.Unauthenticated = (res, message = 'You are not Authenticated. Please Log In!') => {
    res.status(401).json({
        status: false,
        message
    })
}

exports.BadRequest = (res, message) => {
    res.status(400).json({
        status: false,
        message
    })
}

exports.NotFound = (res, message) => {
    res.status(404).json({
        status: false,
        message
    })
}