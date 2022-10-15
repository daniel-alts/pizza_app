const express = require('express')
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userModel = require('../Model/userModel');
const userRoute = express.Router();

require("dotenv").config()



userRoute.get('/', async (req, res)=>{
    const users = await userModel.find()
    res.status(200).send(users)
})


userRoute.post("/signup", passport.authenticate('signup', {session: false}), async(req,res,next)=>{
    res.json({
        message: "signup successful",
        user: req.user
    })
});


userRoute.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login( user, { session: false }, async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, username: user.username };
              const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN);

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


userRoute.put("/:id", async (req, res) =>{
    const id = req.params.id;

    try {
        const updateUser = await userModel.findByIdAndUpdate(id, {$set:{
            username: req.body.username,
            password: req.body.password,
            userType: req.body.usertype,
        }},{
            new: true,
        })
        res.status(200).send(updateUser)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

userRoute.delete("/:id", async (req, res)=>{
    const id = req.params.id

    try {
        const deleteUser = await userModel.findByIdAndDelete(id)
        res.status(200).send("user deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = userRoute