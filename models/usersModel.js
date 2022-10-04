const { Schema, model } = require('mongoose')


const usersModel = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String,

    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
        
    },
    user_type: {
        type: String
    }

})

const users = model("users", usersModel)

module.exports = users