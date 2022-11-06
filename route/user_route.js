const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userRoute = express.Router();
const usercontroller = require('../controllers/usercontroller');

// userRoute.get('/profile', (req, res, next) => {
//     //We'll just send back the user details and the token
//     res.json({
//       message : 'You made it to the secure route',
//       user : req.user,
//       //token : req.query.secret_token
//       secretOrKey: process.env.JWT_SECRET
//     })
//   });


// userRoute.post(
//     '/signup',
//     passport.authenticate('signup', { session: false }), async (req, res, next) => {
//         res.json({
//             message: 'Signup successful',
//             user: req.user
//         });
//     }
// );

userRoute.post('/signup', passport.authenticate('signup', { session: false }), usercontroller.signup)

userRoute.post('/login2', async (req, res, next) => passport.authenticate('login', (err, user, info) => {
    auth.login(req, res, { err, user, info})
})(req, res, next))



userRoute.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                // if(err || !user){
                //     const error = new Error('An Error occured')
                //     return next(error); 
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
                        
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

                       

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

module.exports = userRoute