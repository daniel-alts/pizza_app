const userServices = require('../services/userServices');



const registerUser = async (req, res, userDetails) => {
    const user = await userServices.registerUser(userDetails);
    if (user) {
        return res.status(201).json({ status: true, user });
    } else {
        return res.status(400).json({ status: false, user: null });
    }
};



module.exports = {
    registerUser,
}