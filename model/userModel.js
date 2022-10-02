// const { response } = require("express");
const mongoose = require("mongoose");
// const { schema } = require("./orderModel");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    // id: ObjectId,
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

// *convert id to String
// *Remove id object from response
// *Remove _v from response
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

// const user = mongoose.model();
const user = mongoose.model("user", userSchema);
module.exports = user;