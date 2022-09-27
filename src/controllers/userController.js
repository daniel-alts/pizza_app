const { addUser } = require('../services/userServices');



const registerUser = async (req, res, next) => {
    try {
        const userDetails = req.body.userDetails;
        await addUser(userDetails);
        return res.status(201).json({ status: true, message: "Registration successful." });
    } catch(error) {
        next(error);
    }
};


// const login = async (req, res, next) => {
//     try {
//         const loginDetails = req.body.loginDetails;
//         await findUser(loginDetails);
//         return
//     }
// }




module.exports = {
    registerUser,
}