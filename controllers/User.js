const User = require("../models/userModel");
// loads .env variables
require("dotenv").config();

// imports router from express
const { Router } = require("express");
const { user_type } = require("./roles")
// import bcrypt to hash passwords
const bcrypt = require("bcryptjs");
// import jwt to sign tokens
const jwt = require("jsonwebtoken");
// const { isLoggedIn } = require("./middleware");

// creates router to create route bundle
const router = Router();

// destructure env variables with defaults
const { SECRET ="secret" } = process.env;

// signup route to create a new user
router.post ("/signup", async (req, res) => {
    try {
        req.body.firstName = (req.body.firstName)
        req.body.lastName = (req.body.lastName)
        req.body.phone = (req.body.phone)
        req.body.email = (req.body.email)
        req.body.houseNumber = (req.body.houseNumber)
        req.body.street = (req.body.street)
        req.body.city = (req.body.city)
        req.body.state = (req.body.state)
        // hash the password... pswrd becomes encrypted
        req.body.password = await bcrypt.hash(req.body.password, 10);
        
        // create new user
        const user = await User.create(req.body);
        // send new user as response
        res.json(user);
    }   catch (error) {
        console.log({error})
        res.status(400).json({error});
    }
});


// login route to verify a user and get a token
router.post("/login", async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne ({
            username: req.body.username 
        });
        if (user) {
            //check if password matches user
            const response = await bcrypt.compare (req.body.password, user.password)
            // if password matches username
            if(response) {
                // sign token and send it in the response
                const token = await jwt.sign (
                    { username: user.username },
                    SECRET
                )
                res.json({ token });
            } else {
                res.status(400).json({ error: "password is incorrect!" });
            }
        } else {
            res.status(400).json({ error: "User does not exist!!" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});


router.delete("/delete/:id", user_type, async (req, res) => {
    try {
      // First find the user admin wants to delete
      const user = await User.findById(req.params.id) // getting id from the id you put in url
  
      // Make sure the user who wants to delete another user is an admin
      if (user.admin) {
         await user.deleteOne() // This deletes the user
      } else {
         res.status(403).json("You are not authorized to perform this action")
      }
    } catch (error) {
      res.sendStatus(500);
    }
  });

module.exports = router
