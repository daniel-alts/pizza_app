const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'provide username']
    },
    password: {
        type: String,
        required: [true, 'provide password']
    },
    user_type: {
        type:String,
        values:{
            enum:['admin', 'user'],
            message:'{VALUE} is not supported',
        },
        required:[true, 'provide the user_type'],
    }
}, {timestamps:true})

const db = mongoose.connection.useDb('Altschool')

const User = db.model('Users', UserSchema)

module.exports = User
