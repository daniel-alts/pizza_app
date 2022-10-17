const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    user_type:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    }
},{
    timestamps:true,
})

userschema.pre('save',async(next) => {
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userschema.methods.comparePassword = async(candidatePassword, userPassword) =>{
    return await bcrypt.compare(candidatePassword, userPassword)
  }

userschema.methods.isValidpassword = async(password) =>  {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = mongoose.model('User',userschema);
