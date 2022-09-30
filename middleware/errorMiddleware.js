const { response } = require("express");
const path = require("path");

async function errorHandler(error, req, res, next) {
    switch (error.type) {
        case 'Bad Request':
            return res.status(400).json({ status: false, message: "Invalid Request! Check query parameters", error })
            break;
        case 'Not Found':
            return res.status(404).sendFile(path.join(__dirname, '..', 'public/404.html'))
            break;
        case 'Internal Server Error':
            return res.status(500).json({ status: false, message: 'Internal Server Error', error })
            break;
        default: 
            break;
    }
}

module.exports = errorHandler