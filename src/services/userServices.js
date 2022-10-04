const userModel = require('../models/userModel');
const UserModel = require('../models/userModel');
const { deleteUnrequiredProperty } = require('../utils');



const registerUser = async (user) => {
    let newUser = await UserModel.create(user);
    deleteUnrequiredProperty(newUser, 'password');
    return newUser;
}


const findByUsername = async (username) => {
    const user = await UserModel.find({ username });
    return user;
}
    


// const findUserByEmailAndPassword = async (loginDetails) => {
//     const { usernameOrEmail, password } = loginDetails;
//     const user = await UserModel.find({ email: usernameOrEmail });
//     if (user.password == password) {
//         return user;
//     } else return null;
// }


module.exports = {
    registerUser,
    findByUsername,
}