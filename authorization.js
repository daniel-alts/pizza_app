const userSchema = require("./models/userModel");

exports.authenticateUser = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "user details must be provided" });
  }
  const encryptedAuth = authHeader.split(" ")[1];
  const decrytedAuth = new Buffer(encryptedAuth, "base64").toString();
  const user_pass = decrytedAuth.split(":");
  const username = user_pass[0];
  const password = user_pass[1];

  const user = await userSchema.findOne({ username: username?.toLowerCase() });

  if (!user) {
    return res.status(404).json({ message: "username not found" });
  }
  // console.log(user, password);
  res.locals.user = user;

  if (user.password !== password.toLowerCase()) {
    return res.status(404).json({ message: "incorrect password" });
  }

  next();
};

exports.authenticateAdmin = function (req, res, next) {
  const user = res.locals.user;
  if (user.user_type !== "admin") {
    return res.status(403).json({ message: "All user must have a role" });
  }
  next();
};
