const express = require('express')
const passport = require('passport');
const jwt = require('jsonwebtoken');


const AuthController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', passport.authenticate('signup', { session: false }), AuthController.signup)

authRouter.post('/login2', async (req, res, next) => passport.authenticate('login', (err, user, info) => {
    AuthController.login(req, res, { err, user, info})
})(req, res, next))


authRouter.post('/login',  async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                const error = new Error('Username or password is incorrect');
                return next(error);
            }

            req.login(user, { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id, username: user.username };
                    //You store the id and username in the payload of the JWT. 
                    // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                    // DO NOT STORE PASSWORDS IN THE JWT!
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

                    return res.json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
})

module.exports = authRouter;
