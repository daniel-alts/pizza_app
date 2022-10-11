const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
 

async function signup(req, res, next) {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
}

async function login(req, res, next) {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("username or password is incorrect");
        return next(error);
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
}

module.exports = {
  signup,
  login,
};
