const userServices = require('../services/userServices');


const basicAuthentication = async (req, res, userTypes) => {
    const { username, password } = req.headers.authorization;
    const user = await userServices.findByUsername(username, password);

    if (!user) {
        return res.status(404).json({message: "Invalid username or password."});
    }

    if (!(userTypes.includes(user.userType))) {
        return res.status(401).json({ message: "Request declined. Admin authorization required." });
    }
}




module.exports = {
    basicAuthentication,
};
