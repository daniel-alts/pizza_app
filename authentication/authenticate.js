const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function authenticateUser(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const [username, password] = authorization.split(" ");

    // get the user object from database
    const user = await userModel.findOne({ username });

    // exit if user is not found
    if (!user) {
      return;
    }

    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.authenticatedUser = {
        username: user.username,
        role: user.user_type,
      };
    }
  } catch (err) {
    console.log(err);
  }
}

async function authorizeUser(roles, authenticatedUser, req) {
  try {
    if (roles.includes(authenticatedUser.role)) {
      // user's role is authorized
      req.access = {
        message: "You are authorized to access this resource",
      };
      return;

      // authentication and authorization successful
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { authenticateUser, authorizeUser };
