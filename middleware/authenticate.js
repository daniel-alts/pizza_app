const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
    // use basic authentication from header
    const authorize = req.headers.authorize
    try {
        if (authorize) {
            // remove "Basic "
            const encoded = authorize.substring(6)
            // decode to get username and password as plain text
            const decoded = Buffer.from(encoded, 'base64').toString('ascii')
            const [username, password] = decoded.split(':')
            // get the user object from database
            const authorizedUser = await userModel.findOne({ username })
            // compare the password
            const match = await bcrypt.compare(password, authorizedUser.password)
            // if successful, store the details in the request
            if (match) {
                req.authorizedUser = {
                    username: authorizedUser.username,
                    role: authorizedUser.user_type,
                }
            }
        }
        next()
    } catch (err) {
        next()
    }
}