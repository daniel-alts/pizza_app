const userServices = require('../services/userServices');


const basicAuth = async (req, res, userTypes) => {
    const encodedAuth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(encodedAuth, 'base64').toString().split(':') || '';
    const user = await userServices.findByUsername(username);

    if (!user) {
        return res.status(401).json({message: "Invalid username."});
    }

    if (user.password !== password) {
        return res.status(401).json({message: "Invalid password."});
    }

    if (!(userTypes.includes(user.userType))) {
        return res.status(401).json({ message: "You're not authorized. Please, contact an admin." });
    }
}




module.exports = {
    basicAuth,
};
