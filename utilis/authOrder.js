const userModel = require("./../Schema/userSchema");
module.exports = async (req, res, roles) => {
  return new Promise(async (resolve, reject) => {
    if (!req.body.userData.id) {
      return reject("Please provide user id");
    }
    const user = await userModel.findById(req.body.userData.id);
    if (!user) {
      return reject("User does not exist");
    }
    if (!roles.includes(user.user_type)) {
      return reject("User does not have have access to this feature");
    }
    // if (req.body.password === user.password && roles.includes(user.role)) {
    //   resolve("User found");
    else {
      return resolve("User has access");
    }
  });
};