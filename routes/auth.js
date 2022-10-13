const express = require('express'),
    passport = require('passport'),
    jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post(
    '/signup',
    passport.authenticate('signup', {
        session: false
    }), async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

authRouter.post(
    '/login',
    async(req, res, next) => {
        passport.authenticate('login', async (error, user, info) => {
            try {
                if (error) {
                    return next(error)
                }
                if (!user) {
                    const error = new Error ('Username or password is incorrect');
                    return next(error);
                }

                req.login(user, {session: false}, 
                    async (error)=> {
                        if (error) return next(error);

                        const body = {
                            _id: user._id,
                            email: user.mail
                        };
                        //ADD EXPIRATION TIME, ONCE EXCEEDED, REFRESH TOKEN IS REQUIRED, AND USER IS LOGGED OUT
                        // OR THE USER NEEDS TO LOGIN AGAIN

                        const token = jwt.sign({user: body}, process.env.JWT_SECRET, {expiresIn: '1hr'});

                        return res.json({token})
                    }
                ); 

            } catch (error) {
                return next(error)
            }
        }
        )(req, res, next)
    }
);


module.exports = authRouter