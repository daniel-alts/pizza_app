const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password :{
        type: String,
        required:true
    }, 
    user_type: {
       type: String,
       enum:['user', 'admin']
    }
})

modules.export = mongoose.model('user', schema)