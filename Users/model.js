const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'provide username']
    },
    password: {
        type: String,
        required: [true, 'provide password']
    },
    user_type: {
        type:String,
        values:{
            enum:['admin', 'user'],
            message:'{VALUE} is not supported',
        },
        required:[true, 'provide the user_type'],
    }
}, {timestamps:true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    const ismatch = await bcrypt.compare(candidatePassword, this.password)
    return ismatch
}

const db = mongoose.connection.useDb('Altschool')

const User = db.model('Users', UserSchema)

module.exports = User
