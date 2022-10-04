const mongoose = require('mongoose');
const moment = require('moment');
const timestampsPlugin = require('./plugins/timestamps');


const Schema = mongoose.Schema;


const userSchema = new Schema({
        //Mandatory fields
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: {String, enum: ['admin', 'user']},
            required: true,

        },

        //Additional fields
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        }
    }
);


//Add timestamps for time created and time updated
userSchema.plugin(timestampsPlugin);



module.exports = mongoose.model("users", userSchema);