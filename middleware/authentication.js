const User = require("../model/userModel");

const authenticateUser = async (req, res, next) => {
  const id = req.body.userId;
  const findUser = await User.findById(id);

  if (findUser.user_types !== "admin") {
    res.status(401).send("Not Authorized");
  }
  // res.status(200).json({ order });
  next();
};

module.exports = authenticateUser;
