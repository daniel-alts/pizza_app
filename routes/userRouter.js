const router = require("express").Router();
const UserAPI = require("../controllers/userController");
const passport = require("passport");
const {} = require("jsonwebtoken");
router.post("/register", UserAPI.registerUser);
router.post("/login", UserAPI.login);
router.patch("/:id/update", UserAPI.updateUser);
router.delete("/:id/delete", UserAPI.deleteUser);
//Passport Login
router.post(
  "/login",
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ message: "An error occured" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return res.status(400).json({ msg: "An error occured" });

        const body = { userID: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next)
);
module.exports = router;
