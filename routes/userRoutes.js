const { Router } = require('express');

const User = require('../model/userModel');

function userRoutes() {
  const userRoutes = Router();

  userRoutes
    .route('/')
    .get((req, res) => {
      (async function getusers() {
        try {
          const users = await User.find();
          return res.status(200).json({ status: true, users });
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    });
  userRoutes
    .route('/:userId')
    .get((req, res) => {
      (async function getUser() {
        try {
          const { userId } = req.params;
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          return res.status(200).json(user);
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    })
    .patch((req, res) => {
      (async function updateUser() {
        try {
          const { userId } = req.params;
          const updateInfo = await User.updateOne({ _id: userId }, req.body);
          return res
            .status(204)
            .json({ message: 'User updated successfully.', updateInfo });
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    })
    .delete((req, res) => {
      (async function deleteUser() {
        try {
          const { userId } = req.params;
          const deleteInfo = await User.deleteOne({ _id: userId });
          return res
            .status(200)
            .json({ message: 'User deleted successfully.' });
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    });

  return userRoutes;
}

module.exports = userRoutes;
