const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config;


exports.signup = async (req, res, next) => {
    try {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
            passport.authenticate('login', async (err, user, info) => {
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
                            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
    
                            return res.json({ token });
                        }
                    );
 
                    }) (req, res, next);
                }
    catch (error) {
     next(error);   
    }
}

