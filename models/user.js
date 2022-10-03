const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    firstName: { type: String },
    email: {
        type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    lastName: { type: String },
    password: { type: String },
    phone: { type: String, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);