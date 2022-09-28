const userModel = require("./models/userModel");

exports.authenticateHandler = async function (req, res, next) {
  // Getting the Basic Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed! Credentials not provided!",
    });
  }
  const encryptedAuth = authHeader.split(" ")[1];
  const decryptedAuth = new Buffer.from(encryptedAuth, "base64")
    .toString()
    .split(":");
  const username = decryptedAuth[0];
  const password = decryptedAuth[1];
  const user = await userModel.findOne({ username: username?.toLowerCase() });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed! User does not exist!",
    });
  }
  if (user.password !== password?.toLowerCase()) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed! Wrong password!",
    });
  }
  res.locals.user = user;
  next();
};

exports.adminAuthorizeHandler = async function (req, res, next) {
  if (res.locals.user.user_type !== "admin") {
    return res.status(403).json({
      success: false,
      message:
        "Forbidden! You do not have the permissions to access this resource!",
    });
  }
  next();
};
