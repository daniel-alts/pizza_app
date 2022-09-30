const mongoose = require('mongoose');
const validator = require('validator');


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
            type: {String, enum: ['admin, user']},
            required: true,

        },

        //Additional fields
        email: {
            type: String,
            required: true,
            lowercase: true,
            validate: (val) => {
                return validator.isEmail(val);
            }
        },
        firstName: {
            minLength: [2, "Name length must be at least 2 letters"],
            maxLength: [20, "Name length can't exceed 25 letters."]
        },
        lastName: {
            minLength: [2, "Name length must be at least 2 letters"],
            maxLength: [20, "Name length can't exceed 25 letters."]
        }
    }
);



module.exports = mongoose.model("users", userSchema);