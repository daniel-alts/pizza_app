const userModel = require("./models/userModel");

exports.authenticateHandler = async function (req, res, next) {
  const { userCredentials } = req.body;
  if (!userCredentials) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed! Credentials not provided!",
    });
  }
  const { username, password, user_type } = userCredentials;
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
  if (user.user_type !== user_type?.toLowerCase()) {
    return res.status(401).json({
      success: false,
      message: "This user does not have this role!",
    });
  }
  next();
};

exports.adminAuthorizeHandler = function (req, res, next) {
  console.log("HEY");
  const { userCredentials } = req.body;
  const { user_type } = userCredentials;
  if (user_type.toLowerCase() !== "admin") {
    return res.status(403).json({
      success: false,
      message:
        "Forbidden! You do not have the permissions to access this resource!",
    });
  }
  next();
};
