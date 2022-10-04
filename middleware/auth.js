const userModel = require("../models/userModel");
const User = require("../controls/userController");

exports.authenticatedUser = async (req, res, next) => {
  try {
    const body = req.body;
    const { username, password } = body;
    if (!(username && password)) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.send({
        status: 200,
        message: "Welcome",
        user,
      });
      next();
    }

    if (!user) {
      return res.send({
        status: 401,
        message: "Invalid Details, try again!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 401,
      message: error,
    });
  }
};
