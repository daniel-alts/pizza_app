const userModel = require('../models/userModel');
const UserModel = require('../models/userModel');
const validator = require('validator');



const addUser = async (user) => {
    await UserModel.create(user);
}


const findByUsername = async (loginDetails) => {
    const { username, password } = loginDetails;
    
    const user = await UserModel.find({ username });
    if (user.password == password) {
        return user;
    } else return null;
}
    


// const findUserByEmailAndPassword = async (loginDetails) => {
//     const { usernameOrEmail, password } = loginDetails;
//     const user = await UserModel.find({ email: usernameOrEmail });
//     if (user.password == password) {
//         return user;
//     } else return null;
// }


module.exports = {
    addUser,
    findByUsername,
}