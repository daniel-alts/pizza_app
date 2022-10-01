const User = require("../models/userModels");

exports.authenticateUser = async (req, res, next) => {
    try {
        const id = req.body._id;
        const findUser = await User.findById(id)
        if(findUser.user_type !== 'user') {
            return res.status(401).send("Not Authorized")
        }
        next
    } catch (error) {
        res.json({
            message: error
        })

        
    }
}