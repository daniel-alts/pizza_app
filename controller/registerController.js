const moment = require('moment');
const UserModel = require('../model/userModel');

async function registerUser(req, res) {
  const { firstName, lastName, email, password, user_type } = req.body;

  try {
    const check = await UserModel.findOne({ email });
    if (check) {
      res.end('duplicate found');
      return;
    }
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      user_type,
      created_At: moment().toDate(),
    });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      err,
      message: 'unable to register user',
    });
  }
}

module.exports = {
  registerUser,
};
