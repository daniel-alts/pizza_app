const User = require("../model/userModel");

const authenticateUser = async (req, res, next) => {
  const id = req.body.userId;
  const findUser = await User.findById(id);

  if (findUser.user_type !== "admin") {
    res.status(401).send("Not Authorized");
  }
  next();
};

module.exports = authenticateUser;
