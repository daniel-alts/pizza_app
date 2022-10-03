const userServices = require('../services/userServices');



const registerUser = async (req, res, next) => {
    try {
        const user = await userServices.addUser(req.body);
        if (user) {
            return res.status(201).json({ status: true, user });
        } else {
            return res.status(400).json({ status: false, user: null });
        }
    } catch(error) {
        error.type = '';
        next(error);
    }
};



module.exports = {
    registerUser,
}