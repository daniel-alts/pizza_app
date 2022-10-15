const express = require('express')
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const UserRoute = express.Router()

// const userController = require("../controllers/userController")

UserRoute.post(
    '/signup',
    passport.authenticate('signup', { session: false }), async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

UserRoute.post(
    '/login',
    async (req, res, next) => {
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

                        const body = { _id: user._id, username: user.username, password: user.password };
                        //You store the id and email in the payload of the JWT. 
                        // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                        // DO NOT STORE PASSWORDS IN THE JWT!
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                        return res.json({ token });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
        )(req, res, next);
    }
);


// const { passwordAuth, adminAuth, userAuth } = require("../handlers/authentication")


// UserRoute.get('/', [passwordAuth, adminAuth], userController.allUsers)
// UserRoute.patch('/:id', [passwordAuth], userController.updateUser)
// UserRoute.delete('/:id',[passwordAuth, adminAuth], userController.deleteUser)

module.exports = UserRoute;
