const express = require("express");
const userController = require("../controllers/userController");
// const mongoose = require("mongoose");

const user = require("../model/userModel");
const passport = require("passport");

const router = express.Router();

const { getAllUsers, createUser, loginUser } = userController;
/*Get all users*/
router.get("/", getAllUsers);

// router.route("/").get(authenticate, controller.getAllUsers);

/*Create new user*/
router.post("/register", createUser);
router.post("/login", loginUser);

router.post("/login", async(res, req, next) => {
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

module.exports = router;