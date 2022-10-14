const passport = require("passport");
const jwt = require("jsonwebtoken");

const genToken = function (payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// sign up
exports.signup = async function (req, res, next) {
  try {
    const payload = {
      id: req.user._id,
      username: req.user.username,
      user_type: req.user.user_type,
    };
    const token = genToken(payload);
    return res.status(201).json({
      success: true,
      data: {
        user: req.user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
// sign in
exports.signin = function (req, res, next) {
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    if (err) return next(err);
    try {
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info.message,
        });
      }
      const payload = {
        id: user._id,
        username: user.username,
        user_type: user.user_type,
      };
      const token = genToken(payload);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  })(req, res, next); // passport.authenticate needs the req, res and next arguments
};
