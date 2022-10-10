// const { response } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { schema } = require("./orderModel");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
    },
    password: {
        type: String,
        Number,
        min: [6, "must be atleast 6"],
        max: 20,
        required: [true, "can't be blank"],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    user_type: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    },
}, { timestamps: true });

<<<<<<< Updated upstream
// *convert id to String
// *Remove id object from response
// *Remove _v from response
// userSchema.set("toJSON", {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString();
//         delete returnedObject._id;
//         delete returnedObject.__v;
//     },
// });
=======
// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
userSchema.pre("save", async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});
>>>>>>> Stashed changes

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

// const user = mongoose.model("user", userSchema);
// module.exports = user;
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;