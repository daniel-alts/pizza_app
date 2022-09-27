const userModel = require('../models/userModel');



const addUser = async (user) => {
    await userModel.create(user);
}




module.exports = {
    addUser,
}