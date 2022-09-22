const userModel = require('./../models/userModel')

module.exports = (req, res, roles) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.password || !req.body.username) {
      reject("Username or password is invalid");
    }
    const user = await userModel.find({username: req.body.username})
    
    if (!user) {
      reject("Username or password is invalid");
    }
    if (!roles.includes(user.role)) {
      reject("User does not have have access to this feature");
    }
    if (req.body.password === user.password && roles.includes(user.role)) {
      resolve("User found");
    } else {
      reject("Passwords do not match");
    }
  });
};
