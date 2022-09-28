const userControllers = require("../controllers/users");
const express = require("express");

const router = express.Router();

router.post("/user/signup", userControllers.signUpUser);

module.exports = router