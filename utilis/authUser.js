const userModel = require("./../Schema/userSchema");

module.exports = async (req, res, roles) => {
  return new Promise(async (resolve, reject) => {
    if (!req.body || !req.body.password || !req.body.username) {
      reject("Username or password is invalid");
    }
    const user = await userModel.find({ username: req.body.username });

    // console.log(user[0].user_type);
    if (!user.length) {
      return reject("Username or password is invalid");
    }
    if (!roles.includes(user[0].user_type)) {
      return reject("User does not have have access to this feature");
    }
    if (
      req.body.password === user[0].password &&
      roles.includes(user[0].user_type)
    ) {
      return resolve("User found");
    } else {
      return reject("Passwords do not match");
    }
  });
};