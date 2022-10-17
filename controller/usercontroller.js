const passport = require('passport');
const User = require('../model/usermodel');
const { handleError,errorResponse,successResponse } = require('../utils/response')

exports.signup = async (req, res, next) => {
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
          
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
  
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };

