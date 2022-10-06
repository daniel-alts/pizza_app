const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_type: { type: String, default: "user", enum: [ 'admin', 'user'] },
});

/**
 * Convert id to string
 * Remove id object from response
 * Remove _v from response
 */


// userSchema.set('toJSON', { 
//     transform: (document, returnObject) => {
//         returnObject.id = returnObject._id.toString()
//         delete returnObject._id
//         delete returnObject._v
//     },
// })

const User = mongoose.model('User', userSchema);

module.exports = User;