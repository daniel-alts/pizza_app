const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const catchAsyncError = require("../utils/catchAsyncError");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  // Creating a token with payload(data to be used- using id), secret-key, and option like expireIn as parameter
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});
