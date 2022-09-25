const express = require("express");

const { authenticateHandler, adminAuthorizeHandler } = require("../auth");
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/", createUser);

// Authenticate user
router.use(authenticateHandler);

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);

// Authorize Admin
router.use(adminAuthorizeHandler);

router.get("/", getAllUsers);

router.get("/:userId", getUser);

module.exports = router;
