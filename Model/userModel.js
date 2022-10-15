const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    
    },
    usertype: {
        type: String,
        enum: ['admin', 'user']
    }
    
})

userSchema.pre("save", 
    async function (next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash;
        next()
    }
);

userSchema.methods.isValidPassword= async function(password){
    const user = this;
    const comparePassword = await bcrypt.compare(password, user.password);

    return comparePassword;
}


module.exports = mongoose.model('Users', userSchema)
