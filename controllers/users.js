const userModel = require("../models/userModel");
async function signUpUser(req, res) {
  const body = req.body;
  const user = await userModel.create(body);
  return res.json({ status: true, user });
}

module.exports = { signUpUser };
