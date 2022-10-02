const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function authenticationMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header not set");
    }

    const auth = new Buffer.from(authHeader.split(" ")[1], "base64").toString();
    const credentials = auth.split(":");
    const username = credentials[0];
    const password = credentials[1];

    const user = await userModel.findOne({ username });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Invalid Credentials");
      }

      req.user = user;

      return next();
    }

    throw new Error("Invalid credentials");
  } catch (err) {
    return res.status(401).json({
      status: "Unauthorized",
      message: err.message,
    });
  }
}

module.exports = authenticationMiddleware;
