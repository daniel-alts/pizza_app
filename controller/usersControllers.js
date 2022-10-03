const moment = require('moment');
const UserModel = require('../model/userModel');

function getUsers(req, res) {
  UserModel.find({})
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
}

function getUserByID(req, res) {
  const id = req.params.id;

  UserModel.findById(id)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.send('Error fetching user'));
}

function deletebyId(req, res) {
  const id = req.params.id;
  console.log(id);
  UserModel.findByIdAndDelete(id)
    .then(() => res.status(200).send('deletion complete'))
    .catch((err) => res.status(500).send(' failed'));
}
module.exports = {
  getUsers,
  getUserByID,
  deletebyId,

};
