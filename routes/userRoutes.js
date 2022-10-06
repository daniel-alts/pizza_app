const router = require("express").Router();


// Users Registeration Route
router.post("/register-user", async (req, res) => {
    await userRegister(req.body, "user", res);
  });
  
  // Admin Registration Route
  router.post("/register-admin", async (req, res) => {
    await userRegister(req.body, "admin", res);
  });
  

  module.exports = router