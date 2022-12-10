const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../models/sequelizeConnect");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

const userModel = db.users;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Creating a token function with payload(data to be used- using id), secret-key, and option like expireIn as parameter
const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); // {id: id} === { id }
};

/**
 * @desc    Sign up a user
 * @route   POST /api/v1/users/signup
 * @access  Public
 */
exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await userModel.create({
    // i didnt include user_type here as defined in my userModel blc i want to be in charge of giving user admin access by adding it to the db manually
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  // Creating a token and sending it to the client
  const token = signToken(newUser.id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

/**
 * @desc    Login a user
 * @route   POST /api/v1/users/login
 * @access  Public
 */
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // Checking if email & password exist
  if (!email || !password) {
    return next(new AppError(`Please provide email and password`, 400));
  }

  // Checking if user exists & password is correct
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError(`User not found`, 401));
  }
  const validatePassword = await user.checkPassword(password, user.password);
  if (!validatePassword) {
    return next(new AppError(`Incorrect Email or Password!`, 401));
  }

  // Sending token to client if everything is ok
  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    token,
  });
});

/**
 * @desc   Protecting routes middleware
 * @route  All order routes
 * @access Private
 */
exports.protectRoute = catchAsyncError(async (req, res, next) => {
  // Getting token and checking if it exists
  let token;
  // Checking if the authorization header is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError(`You are not logged in. Please login`, 401));
  }
  const verifiedToken = await promisify(jwt.verify)(token, JWT_SECRET);
  if (!verifiedToken) {
    return next(new AppError(`Invalid token. Please login again`, 401));
  }

  // Checking if user still exists
  const currentUser = await userModel.findOne({
    where: { id: verifiedToken.id },
  });
  if (!currentUser) {
    return next(new AppError(`This user no longer exists`, 401));
  }

  // Protecting the route
  req.user = currentUser;

  next();
});
