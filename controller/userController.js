const users = require("../model/user");

//Perform CRUD operations
//CREATE Users
exports.add_user = (req, res) => {
  const user = req.body;
  users
    .create(user)
    .then((user) => {
      res.status(200).send({ message: "New user created", data: user });
    })
    .catch((err) => {
      res.status(400).send({ message: "Error! User not created", data: err });
    });
};
//GET Users
exports.all_users = (req, res) => {
  users
    .find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
