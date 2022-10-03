const { Router } = require("express");
const userController = require("../controllers/user");

const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;