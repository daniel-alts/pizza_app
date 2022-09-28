const router = require("express").Router();
const UserAPI = require("../controllers/userController");

router.post("/register", UserAPI.registerUser);
router.post("/login", UserAPI.login);
router.patch("/:id/update", UserAPI.updateUser);
router.delete("/:id/delete", UserAPI.deleteUser);
module.exports = router;
