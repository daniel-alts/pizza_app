const userModel = require("./models/userModel");

exports.authenticateUser = async function (req, res, next) {
  // Using Basic Authorization
  const authenticationHeader = req.headers.authorization;
  if (!authenticationHeader) {
    return res.status(401).json({
      status: "failed",
      message: "Credentials not provided!",
    });
  }
  const encryptUserAndPass = authenticationHeader.split(" ")[1];
  const decryptUserAndPass = new Buffer.from(encryptUserAndPass, "base64")
    .toString()
    .split(":");
  const username = decryptUserAndPass[0];
  const password = decryptUserAndPass[1];
  const user = await userModel.findOne({ username: username?.toLowerCase() });
  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "Cannot find user!",
    });
  }
  if (user.password !== password?.toLowerCase()) {
    return res.status(401).json({
      status: "failed",
      message: "Incorrect password!",
    });
  }
  res.locals.user = user;
  next();
};

exports.authorizeAdmin = async function (req, res, next) {
  if (res.locals.user.user_type !== "admin") {
    return res.status(403).json({
      status: "failed",
      message: "You must be an admin!",
    });
  }
  next();
};
