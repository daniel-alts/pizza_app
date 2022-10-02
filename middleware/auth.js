const User = require("../api/models/userModel");
const jwt = require("jsonwebtoken");

/* This method accepts Bearer token */
module.exports.authorize = function (req, res, next) {
  /* Get header */
  let token = req.headers.authorization;
  if (token) {
    /** 
     * Split header to get token

     * sanple Bearer token
     * `Bearer E4fer4....`
    */
    token = token.split(" ")[1];
    if (token) {
      let decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
      if (decoded) {
        next();
      } else {
        res
          .status(400)
          .json({ status: false, message: "token verification failed" });
      }
    } else {
      res.status(400).json({ status: false, message: "malformed auth header" });
    }
    // try {
    // } catch (error) {
    //     next()
    // }
  } else {
    res.status(400).json({
      status: false,
      message: "No authorization header",
    });
  }
};
