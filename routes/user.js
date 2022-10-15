const express = require("express")
const userModel = require("../model/userModel")
const passport = require("passport");
const jwt = require("jsonwebtoken");

const userRoute = express.Router()



//get users
userRoute.get("/", (req, res) => {
    userModel.find({})
    .then((users) => {
        res.status(200).send(users)
        // const userobj = (JSON.stringify(users))
        // console.log(userobj)
        // const userobj1 = (JSON.parse(userobj))
        console.log(users[1].username)
        console.log(users[0].username);
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
    })
})

//get user by id
userRoute.get("/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
  userModel.findById(id)
    .then((user) => {
      res.status(200).send(user);
    }).catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
});

//create or register user
userRoute.post("/signup", passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);
// userRoute.post("/", (req, res) => {
//     const user = req.body
//     console.log(user)

//     userModel.create(user)
//     .then((user) => {
//         res.status(201).send({
//             message: "user registered successfully",
//             data: user
//         })
//     }).catch((err) => {
//         res.status(400).send(err)
//     })
// });

// login in
userRoute.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        //You store the id and email in the payload of the JWT.
        // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
        // DO NOT STORE PASSWORDS IN THE JWT!
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

//update user by id
userRoute.put("/:id", (req, res) => {
    const id = req.params.id
    const user = req.body
    console.log("updating user with id" + id)
    userModel.findByIdAndUpdate(id, user, {new: true})
    .then((user) => {
        res.status(200).send(user)
    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)
    })
});

//delete user by id
userRoute.delete("/:id", (req, res) => {
    const id = req.params.id
    userModel.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({
            message: "deletion successful",
            data: ""
        });
      }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    console.log("deleting book with id" + id)
});



module.exports = userRoute