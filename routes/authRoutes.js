const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

function authRoutes() {
  const authRouter = Router();
  authRouter.route('/signup').post((req, res) => {
    const { username, password, email, user_type } = req.body;
    (async function registerUser() {
      try {
        const user = new User({ username, password, email, user_type });
        const savedUser = await user.save();
        passport.authenticate('local', { session: false })(req, res, () => {
          const body = {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            user_type: savedUser.user_type,
          };
          const token = jwt.sign(body, process.env.JWT_SECRET);
          return res
            .status(201)
            .json({
              message: 'Successfully registered your account.',
              user: body,
              token,
            });
        });
      } catch (err) {
        return res.status(500).json(err);
      }
    })();
  });
  return authRouter;
}

module.exports = authRoutes;
