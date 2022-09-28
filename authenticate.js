const UserModel = require("./models/userModel");

async function authenticateUser(req, res, next) {
  const { id } = req.query;
  const isUser = await UserModel.findById(id);
  if (!isUser) {
    return res.status(409).json({ status: false, message: "Unauthorized" });
  }
  next();
}

module.exports = authenticateUser;
