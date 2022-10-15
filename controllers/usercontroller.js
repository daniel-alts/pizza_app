const passport = require("passport");
const jwt = require("jsonwebtoken");

const usereModel = require("../models/userModel");
require("dotenv").config();

// SIGNUP CONTROLLER ROUTE
exports.signup = async function (req, res, next) {
  try {
    return res.json({
      message: "Signup successful",
      user: req.user,
    });
  } catch (error) {
    return next(error, { message: "signing up failed" });
  }
};
// LOGIN CONTRLLER ROUTE
exports.login = async function (req, res, next) {
  try {
    passport.authenticate("login", async (err, user, info) => {
      console.log(user);
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        const body = { _id: user._id, username: user.username };

        const token = await jwt.sign(
          body,
          process.env.JWT_SECRET,
          process.env.EXPIRATION_TIME
        );
        console.log(token);
        return res.json({ token });
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.addUser = async function (req, res) {
  try {
    const userDetails = req.body;
    await usereModel.create(userDetails);
    return res.status(201).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateUser = async function (req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const userDetails = req.body;
    console.log(userDetails);

    const user = await usereModel.findById(userId);
    // console.log(user)
    if (!user) {
      return res.status(404).json({ status: false, order: null });
    }
    await usereModel.findByIdAndUpdate(userId, userDetails, {
      runValidators: true, // Runs validations for the updated fields
    });

    return res.json({ status: true });
  } catch (error) {
    res.status(404).json({ message: "user update unsuccessful", error });
  }
};
exports.deletaAllUsers = async function (req, res) {
  try {
    console.log(req.params);
    const { userId } = req.params;

    const order = await usereModel.deleteOne({ _id: userId });

    return res.json({ status: true, order });
  } catch (error) {
    res.status(401).json({ message: "user deletion failed", error });
  }
};
exports.getAllUsers = async function (req, res) {
  try {
    // res.status(200);
    const users = await usereModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Error!!, Cant'get all user " });
  }
};
exports.getAllUsersById = async function (req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const order = await usereModel.findById(userId);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, order });
  } catch (error) {
    return res.status(404).json({ message: "can't get user by id", error });
  }
};
