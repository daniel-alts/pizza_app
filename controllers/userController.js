const userModel = require("./../models/userModel");
const APIFeatures = require("./../utils/APIFeatures");


exports.createUser = async (req, res) => {
  try {
    const user = userModel.create(req.body);
    return res.status(201).json({ status: true, user });
  } catch (err) {
    res.json({
      status: "fail",
      message: err,
    });
  }
};
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
        const error = new Error("Username or password is incorrect");
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
};