const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
username:{type:String, required:true, unique:true, trim:true},
password:{type:String, required:true, unique:true, trim:true},
user_type:{type:String, enum:["user", "admin"] },
createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

// To ensure that the user trying to log in has the correct details. Using the following new method:
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


const user = mongoose.model('User', UserSchema);

module.exports = user;
