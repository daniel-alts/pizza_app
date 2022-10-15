const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRoute = express.Router();

//A new user registers and is logged in afterwards
userRoute.post("/signup", async (req, res, next) => {
  passport.authenticate(
    "signup",
    { session: false },
    async (err, user, info) => {
      try {

        if (!user) {
          const error = new Error("Username already exists");
          return next(error);
        }

        if (err) {
          return next(err);
        }

        const body = { id: user.id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({
          message: "Signup successful",
          user: req.user,
          token: token,
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});
 
//An existing user signs in
userRoute.post(
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

                        const body = { id: user.id, username: user.username };
                        //This stores the id and email in the payload of the JWT. 
                        //Then signs the token with a secret or key (JWT_SECRET), and sends back the token to the user.
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '1h' });

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


module.exports = userRoute;