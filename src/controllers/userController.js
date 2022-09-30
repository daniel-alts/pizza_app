const moment = require("moment");
const User = require("../models/userModel");

async function login(req, res, next) {
  let { username, password } = req.body;
  
  if (!username) {
    return res.status(404).send("username required")
  } else if (!password) {
    return res.status(404).send("password required")
  }
  let checkUser = await User.findOne({ username: username })
    if(!checkUser)  {
      return res.status(404).send("Access denied, Sign up!!!")
    }
    if(checkUser.password!=password){
      return res.status(404).send("Password Incorrect!!!")
    }
    res.json({
        message: "user logged in successfully"
    })
 
}

async function signUp(req, res, next) {
  try{
  const body = req.body;
  if (!body) {
    return res.status(404).send("Sign up failed")
  }
  body.created_at = moment().toDate();
  const userDetails = await User.create(body);
  res.send(userDetails)
}catch(error){
  res.json({
    message: error
  })
}
}

module.exports = {
  login,
  signUp,
};
