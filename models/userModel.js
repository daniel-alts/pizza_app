const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true 
    },
  password: {
        type: String,
        required: true,
        min: [6, "password must be morethan 6 inputs"]

    }
})

userSchema.pre("save",async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

userSchema.methods.isValidPassword = async function(password) {
    const user = this 
    const compare = await bcrypt.compare(password , user.password)

    return compare
}

const user = mongoose.model("user", userSchema)

module.exports = user