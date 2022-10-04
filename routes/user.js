const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../authentication/auth");

router.post("/signup", userController.createUser);
router.get("/", userController.getUsers);
router.delete(
	"/:id",
	auth.authenticateUser,
	userController.deleteUser
);

module.exports = router;
