// ********************IMPORT DEPENDENCY, DEFINE SCHEMA AND CREATE USER MODEL ************/
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    id: ObjectId,
    created_At: Date,
    username: {type: String, required: true},
    password: {type: String, required: true},
    user_type: ['admin', 'user']
})


//add a pre-hook function to the UserSchema. This function gets called
//before the user info is stored in the database
UserSchema.pre(
    'save',async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 12)
        this.password = hash;
        next()
    }
)

//Add a method to the Schema. This method will chain a
//function that compares and validates the password.
//in this case 'isValidPassword' is the function that gets called
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare;
}
const User = mongoose.model('User', UserSchema)
module.exports = User;
