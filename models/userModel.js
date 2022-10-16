const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required:[true, "first name is required"]
    },
   
    username:{
        type:String,
        required:[true, "username is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'PassWord is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    user_type:{
        type: String,
        enum:['admin', 'user']
    }
})

userSchema.pre(
    'save',
    async function (next){
        const user = this
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        next()
    }
)

userSchema.methods.isValidPassword = async function (password){
    const user = this
    const compare = await bcrypt.compare(user.password, password)
    return compare
}

module.exports = mongoose.model('users', userSchema)