const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type: String, required:true, unique:true },
    password: { type: String, required:true },
    isAdmin: { type: Boolean, default: false, },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model
// https://soufiane-oucherrou.medium.com/user-registration-with-mongoose-models-81f80d9933b0
// https://stackoverflow.com/questions/72256616/express-mongoose-how-to-add-user-data-to-post-request-when-submitting-a-form
// add users express mongoose schema
