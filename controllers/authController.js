const userModel = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
