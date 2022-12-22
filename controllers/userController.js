const db = require("../models/sequelizeConnect");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

const userModel = db.users;

exports.authenticateUser = catchAsyncError(async (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const { authorization } = req.headers;
  // console.log(req.headers);
  // Check if the authorization header is present
  if (!authorization) {
    return next(
      new AppError("You are not authorized to access this route.", 401)
    );
    return next(error);
  }
  // Get the credentials from the authorization header
  let userAuth = new Buffer.from(authorization.split(" ")[1])
    .toString()
    .split(":");
  // console.log(userAuth);

  // checking if the credentials are present
  let username = userAuth[0];
  let password = userAuth[1];

  // Checking if the credentials are correct
  const user = await userModel.findOne({
    username: username,
    password: password,
  });

  if (!user) {
    return next(new AppError(`Unauthorized!!! Invalid Credential❌ `, 404));
  }
  // If the credentials are correct, then the user is authenticated and can access the order route
  console.log(
    "You are auntheticated successfully. You can access the order route"
  );
  next();
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await userModel.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  console.log("Users", users);
  res.status(200).json({
    status: "success",
    result: users.length,
    users: {
      users,
    },
  });
});

// exports.getUser = catchAsyncError(async (req, res, next) => {
//   const id = req.params.id;
//   const user = await userModel.findById(id);
//   console.log("User", user);
//   res.status(200).json({
//     status: "success",
//     users: {
//       user,
//     },
//   });
// });

// exports.updateUser = catchAsyncError(async (req, res, next) => {
//   const id = req.params.id;
//   const body = req.body;

//   if (Object.keys(body).length === 0) {
//     return next(new AppError(`Please provide a data to update `, 404));
//   }

//   const user = await userModel.findByIdAndUpdate(id, body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!user) {
//     return next(new AppError(`No user found with this specified ID `, 404));
//   }

//   res.status(200).json({
//     status: "success",
//     users: {
//       user,
//     },
//   });
// });

// exports.deleteUser = catchAsyncError(async (req, res, next) => {
//   const id = req.params.id;
//   const user = await userModel.findByIdAndRemove(id);
//   if (!user) {
//     return next(new AppError(`No user found with this specified ID `, 404));
//   }
//   res.status(201).json({ status: "success", users: user });
// });
