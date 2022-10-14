const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You have to input your usename to continue"],
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    password: {
        type: String,
        min: [6, "must be atleast 6"],
        max: [20, "muat be at most 20"],
        required: [true, "You have to input your password to contnue"],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },
    user_type: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    },
});


//pre hook
userSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
)

//password comparism
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;