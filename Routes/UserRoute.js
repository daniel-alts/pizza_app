const express = require("express");
const UserRouter = express.Router();
// const UserDB = require("../Models/UserModel");
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');


UserRouter.post(
  '/signup',
  passport.authenticate('signup', {session: false}),
  async (req, res, next) => {
    res.json({
       message: 'Signup Successful',
       user: req.user 
    });
  }
);

UserRouter.post(
  '/login',
async (req, res, next)=> {
  passport.authenticate('login', async (error, user) => {
    try {
      if (error) {
        console.log("Error: ", error.message)
         console.log(error)
      }
      console.log(req)

      req.login(user, {session: false},
        async(error) => {
          if(error) return next(error);
          const body = {_id: user._id, username: user.username};
          const token = jwt.sign({user:body}, process.env.JWT_SECRET);
  
          return res.json({token});
        }
        )
    } catch(error) {
      console.log(error);
    }
}
)(req, res, next);
}
);


// UserRouter.post("/", async (req, res) => {
//   const { Username, Password, UserType } = req.body;
//   if (!(Username || Password))
//     return res.status(400).json({ 
//         message: "Usernames and passwords are required" });
//   try {
//     const newUser = await UserDB.create({
//       username: Username,
//       password: Password,
//       userType: UserType,
//     });
//     res.status(201).json({ 
//         Data: newUser });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json(error.message);
//   }
// });

// UserRouter.get("/", async (req, res) => {
//   try {
//     const Users = await UserDB.find();
//     res.status(200).json(Users);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json(error.message);
//   }
// });

// UserRouter.get("/:id", async (req, res) => {
//   try {
//     const {id} = req.params
//     const User = await UserDB.findById(id);
//     res.status(200).json(User);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json(error.message);
//   }
// });


module.exports = UserRouter;
