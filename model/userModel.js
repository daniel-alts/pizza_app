const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: [true, 'User already registered']
    },
    userType:{
        type: String,
        required: true,
        enum: [ "user","admin"],
        default: "user"
    }
})

UserSchema.pre(
    'save',
    async function (next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
)

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;