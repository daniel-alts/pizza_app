const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * signup() - registers user
 * @req: contains request details
 * @res: contains response details
 *
 * Return: Signup Successful
 */
async function signup(req, res, next) {
  res.json({
    message: 'Signup successful',
    user: req.user,
  });
  next();
}

/**
 * login() - checks if user is in database and adds token
 * @req: contains request details
 * @res: contains response details
 *
 * Return: Logged In Successfully!
 * If no user, return Username not found!
 * If password is incorrect, return Incorrect password!
 */
async function login(req, res, next) {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error('Username or password is incorrect');
        return next(error);
      }

      req.login(
        user,
        { session: false },
        async (error) => {
          if (error) return next(error);

          const { _id } = user;

          const body = {
            _id,
            username: user.username,
            userType: user.userType,
          };
          const token = jwt.sign({
            user: body,
          }, process.env.JWT_SECRET);

          return res.json({
            token,
          });
        },
      );
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
}

module.exports = {
  signup,
  login,
};
