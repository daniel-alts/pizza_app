const express = require("express");

const { adminAuthorizeHandler } = require("../auth");
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);

// Authorize Admin
router.use(adminAuthorizeHandler);

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

module.exports = router;
