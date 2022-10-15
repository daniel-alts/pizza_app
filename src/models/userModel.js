const mongoose = require('mongoose');
const moment = require('moment');
const timestampsPlugin = require('./plugins/timestamps');
const bcrypt = require('bcrypt');


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
            type: String, 
            enum: ['admin', 'user'],
        },

        //Additional fields
        email: {
            type: String,
            lowercase: true,
        },
        firstName: {
            type: String,
            default: ""
        },
        lastName: {
            type: String,
            default: ""
        }
    }
);


//Add timestamps for time created and time updated
userSchema.plugin(timestampsPlugin);


//Pre-save hook to hash the password before saving user details to the DB
userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});


//Compares the password entered by user with what exists in the DB
userSchema.methods.isValidPassword = async function(password) {
    const compareResult = await bcrypt.compare(password, this.password);
    return compareResult;
}



module.exports = mongoose.model("users", userSchema);