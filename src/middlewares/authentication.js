const userServices = require('../services/userServices');


const basicAuth = async (req, userTypes) => {
    const encodedAuth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(encodedAuth, 'base64').toString().split(':') || '';
    const user = await userServices.findByUsername(username);
    if (!user || user.length == 0) {
        req.ERROR_MESSAGE = 'Invalid username';
        return false;
        // return res.status(401).json({message: "Invalid username."});
    }

    if (user.password !== password) {
        req.ERROR_MESSAGE = 'Invalid password';
        return false;
        // return res.status(401).json({message: "Invalid password."});
    }

    if (!(userTypes.includes(user.userType))) {
        req.ERROR_MESSAGE = "You're not authorized. Please, contact an admin.";
        return false;
        // return res.status(401).json({ message: "You're not authorized. Please, contact an admin." });
    }
    return true;
}




module.exports = {
    basicAuth,
};
