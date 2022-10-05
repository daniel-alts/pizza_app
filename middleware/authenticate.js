const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  const { username } = req.body.user;
  const user = User.findOne({ username });
  if (!user)
    return res
      .status(401)
      .json({ message: "This user does not exist in the database" });
  next();
};

module.exports = { authenticate };
