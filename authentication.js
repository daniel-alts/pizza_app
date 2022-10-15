const users = require("./model/userModel");
const orderRoute = require("./routes/order");

const password_authentication = (req, res) => {
  return new Promise((resolve, reject) => {
    const user_info = req.body;
    if (!user_info) {
      reject("No username and password provided !");
    }
    const user = users.getUser(user_info.username);
    if (!user) {
      reject("Username not found please sign up !");
    }
    if (user.password === user_info.password) {
      resolve();
    }
  });

  password_authentication()
    .then(() => {
      orderRoute;
    })
    .catch((err) => {
      res.status(400);
      res.send({
        err,
      });
    });
};

module.exports = { password_authentication };
