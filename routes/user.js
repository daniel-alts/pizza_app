const express = require("express");
<<<<<<< Updated upstream
const userController = require("../controllers/userController");
// const mongoose = require("mongoose");
=======
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const controller = require("../controllers/userController");
>>>>>>> Stashed changes
const authenticate = require("../middlewares/authenticate");
const user = require("../model/userModel");
const passport = require("passport");

<<<<<<< Updated upstream


const router = express.Router();

const {getAllUsers, createUser, loginUser} = userController;
/*Get all users*/
router.get("/", getAllUsers)

// router.route("/").get(authenticate, controller.getAllUsers);

/*Create new user*/
router.post("/register", createUser);
router.post("/login", loginUser);

=======
const authRouter = express.Router();
/*Get all users*/
const { getAllUsers, createUser, loginUser } = controller;
authRouter.get("/", getAllUsers);

/*Route to Create new user*/

authRouter.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async(req, res, next) => {
        res.json({ message: "Signup successful", user: req.user });
    },
    createUser
);
>>>>>>> Stashed changes

authRouter.post("/login", async(res, req, next) => {
    passport.authenticate("login", async(err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                const error = new Error("Username or password is incorrect");
                return next(error);
            }
            req.login(user, { session: false }, async(error) => {
                if (error) return next(error);
                const body = { _id: user._id, email: user.email };

                const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});
// router.post("/login", loginUser);

module.exports = authRouter;