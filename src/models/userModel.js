const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const ObjectId =  mongoose.Schema.ObjectId


const UserSchema = new mongoose.Schema({
    id: ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, 'password must be at leat 6 characters'],
        match: [/^[a-zA-Z0-9]{6,30}$/]
    },
    user_type: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
        type: String,
        required: true,
    }

}, 
{timestamps: true}
)

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;