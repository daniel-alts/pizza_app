const userController = require('../controllers/userController');


module.exports = async (req, res) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const encoded = authorization.substring(6);
        const decoded = Buffer.from(encoded, 'base64').toString('ascii');
        const [userName, password] = decoded.split(':');

        const authenticateUser = await userController.getByUserName(userName);
        if (authenticateUser) {
            if (authenticateUser.password == password) {
               return authenticateUser
            }
        }
    }
}