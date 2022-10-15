const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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

//hashing the user's password for security
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function(username, password){
    const user = await this.findOne({username})

    if (user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error('Invalid password. Please try again')
    }
    throw Error(`Sorry, this user doesn't exist`)
}

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;