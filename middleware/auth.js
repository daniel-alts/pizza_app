const Users = require("../models/userModel");

const auth = {};

auth.adminAuthenticated = async (req, res, next) => {
  const email = req.params.email;
  const password = req.params.password;

  try {
    const user = await Users.findOne({ email: email, password: password });
    if (user.user_type === "admin") {
      next();
    } else {
      res.status(401);
      res.send({
        status: "fail",
        message: "unauthorized action",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// a function that authenticate all users stored in DB
auth.userAuthenticated = async (req, res, next) => {
  const email = req.params.email;
  const password = req.params.password;

  try {
    const user = await Users.findOne({ email: email, password: password });
    if (user.user_type === "user") {
      next();
    } else {
      res.status(401);
      res.send({
        status: "fail",
        message: "unauthorized action",
      });
    }
    
  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports = auth