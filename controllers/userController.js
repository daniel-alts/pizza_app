const User = require("../models/userModel");
module.exports = class UserAPI {
  static async registerUser(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
    if (!username || !firstname || !lastname || !email || !password) {
      throw new Error("Invalid Credentials");
    }
    try {
      const user = await User.create({
        "name.first": firstname,
        "name.last": lastname,
        username,
        email,
        password,
      });
      res.status(201).json({ user });
    } catch (err) {
      res.status(401).status({ Error: err });
    }
  }
  static async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Invalid Request");
    }
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json("User does not exist, please register");
      }
      const isPassValid = user.password === password;
      if (!isPassValid) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      res.status(200).json("Logged In");
    } catch (err) {
      res.status(401).json({ Error: err });
    }
  }
  static async updateUser(req, res) {
    const { id: UserID } = req.params;
    try {
      const user = await User.findByIdAndUpdate({ _id: UserID }, req.body, {
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json("User does not exist, please register");
      }
      res.status(200).json("User Updated Successfully");
    } catch (err) {
      res.status(401).json({ Error: err });
    }
  }
  static async deleteUser(req, res) {
    const { id: UserID } = req.params;
    try {
      const user = await User.findByIdAndDelete({ _id: UserID });
      if (!user) {
        return res.status(404).json("User does not exist, please register");
      }
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(401).json({ Error: err });
    }
  }
};
