const express = require('express');
const User = require("../userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const userRoutes = express.Router()

// userRoutes.post( "/users/new", async (req, res) => {
//     if (await User.findOne({ username: req.body.username })) {
//       return res
//         .status(400)
//         .json({ status: true, message: "User already exists!" });
//     }
//     const newUser = await User.create(req.body);
//     return res.json({ status: true, newUser });
// });

userRoutes.post("/users/signup", passport.authenticate('signup', {session: false}), async (req, res) => {
  if (!user) {
    res.statusCode = 400;
    return res.json({message: req.authInfo.message});
  }
  res.json({message: "User signed up succesfully!",
            user: req.user})
})

userRoutes.post("/users/login", async (req, res, next) => {
  passport.authenticate('login', (err, user, message) => {
    try {
      if (err) {
        const error = new Error(`An error occured: ${err.message}`);
        return next(error);
      }

      if (!user) {
        res.statusCode = 404;
        return res.json({message: "User doesn't exists"})
      }

      req.login(user, {session: false}, (err) => {
        if (err) {
          const error = new Error(`Couldn't log user in due to: ${err.message}`)
          return next(error);
        }

        const token = jwt.sign({user: {user_id: user._id, username: user.username}}, process.env.SECRET_KEY)
        return res.json({token, message: message.message})
      })
    } catch (error) {
      next(error);
    }
  })(req, res, next)
})

module.exports = userRoutes;