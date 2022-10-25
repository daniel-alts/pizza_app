
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema(
    {
        id: ObjectId,
        username : 
        {
         type:String, 
         required:true, 
         unique: true
        },

        password : 
        {
         type: String, 
         required:true
        },

        email: 
         {
         type:String, 
         required:true, 
         unique:true
        },

        user_type: 
         { 
         type : String, 
         enum:['admin','user'], 
         default: 'user'
         }
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema);



