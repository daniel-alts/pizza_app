const express = require("express");
const UserModel = require('../models/userModel')
const moment = require('moment')
const router = express.Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllerFunctions/userFunc')

router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
