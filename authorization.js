const UserDB = require('./models/UserModel')

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization){
        res.status(426).send('authorization required')
    }
    try {
        const encoded = authorization.substring(6);

        const decoded = Buffer.from(encoded, 'base64').toString('ascii')

        const [username, password] = decoded.split(':');
        const authenticatedUser = await UserDB.find({username});

        if(authenticatedUser.password == password){
            req.authenticateUser = {
                username: authenticatedUser.username,
                role: authenticatedUser.userType,
            }
        }
        next()
    } catch (error){
        res.send(error)
    }
}