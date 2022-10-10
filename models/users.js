const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    user_type:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    }
})

UserSchema.pre("save",async function(next){
    const user = this
    const password = await bcrypt.hash(user.password,10)

    user.password = password
    next()
})

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;