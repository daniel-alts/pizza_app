const mongoose = require("mongoose");

const userSchema = mongoose.Schema;

const bcrypt = require("bcrypt");


const userModel = new userSchema({
    username: {
        type: String,
        required: [true, "Please enter a valid username!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password!"]
    },
    user_type: {
        type: String, 
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamp: true});

userModel.pre("save", async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

userModel.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}



module.exports = mongoose.model("users", userModel);