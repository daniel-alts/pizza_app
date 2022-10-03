const moment = require('moment');
const UserModel = require('../model/userModel');

async function registerUser(req, res) {
  const { firstName, lastName, email, password, user_type } = req.body;

  const check = UserModel.find({ email });

  if (check.length < 1) {
    res
      .status(400)
      .send('Email already in use, Register with another email address');
    return;
  }

  UserModel.create({
    firstName,
    lastName,
    email,
    password,
    user_type,
    created_At: moment().toDate(),
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        err,
        message: 'unable to register user',
      });
    });
}

module.exports = {
  registerUser,
};
