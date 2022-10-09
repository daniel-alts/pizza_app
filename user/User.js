const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const AuthenticatorSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
    
  

  });
  
  const Authenticator = mongoose.model(' Authenticator', AuthenticatorSchema);
  
  module.exports =  Authenticator;