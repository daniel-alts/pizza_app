const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  // get basic authentication from header
  const { authorization } = req.headers;
  try {
    // check if username and password was provided
    if (!authorization)
      return res.status(403).send("Forbidden, provide authorization");
    if (authorization) {
      // split string to remove the "basic" prefix
      const basicOauth = authorization.split(" ")[1];
      // decode username and password to plain text
      const decoded = Buffer.from(basicOauth, "base64").toString("ascii");
      // split decoded authorization
      const [username, password] = decoded.split(":");
      // database info
      const user = await userModel.findOne({ username });
      // compare the password
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(403).send("Username or password incorrect");
      // else, store the details in the request
      if (match) {
        req.user = {
          username: user.username,
          role: user.user_type,
        };
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send(" Server Error");
  }
};
