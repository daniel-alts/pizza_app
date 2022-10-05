const mongoose = require ('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema ({

    id : ObjectId,
    created_at : Date,
    firstName : {type : String},
    lastName : {type : String},
    email : {
        type : String , maxlenght : 50, unique : true, lowercase : true
    },
    password : {type : String},
    phone : {type : String},
    role : {type : String , enum : ["admin" , "user"], default : "user"}
},
{ timestamps : true});

const User = mongoose.model('User', userSchema)

module.exports = User;