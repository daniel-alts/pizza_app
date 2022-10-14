const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const User = require('../models/userModels')
const passport = require("passport");


exports.signup = async (req, res, next) => {
    // SUCCESS RESPONSE
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  
};

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next("Username or password is incorrect", 400);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        //You store the id and email in the payload of the JWT.
        // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
        // DO NOT STORE PASSWORDS IN THE JWT!
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
