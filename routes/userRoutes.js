const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const userValidatorMiddleware = require("../validators/user.validator");

router.post("/signup", userValidatorMiddleware, authController.signup);
router.post("/login", authController.login);

router.route("/").get(userController.getAllUsers);
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
