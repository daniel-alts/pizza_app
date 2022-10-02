const { Router } = require("express");
const controller = require("../controllers/user");

let router = Router();

router.post("/signin", controller.signin);
router.post("/signup", controller.signup);

module.exports = router;
