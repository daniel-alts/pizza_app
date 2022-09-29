const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const moment = require("moment");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ status: true, users });
};

// Get single user
const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({ error: "No such Id" });
  }
  const users = await userModel.findById(userId);

  if (!users) {
    res.status(404).json({ status: false, users: null });
  }
  return res.status(200).json({ status: true, users });
};
// Create User
const createUser = async (req, res) => {
  const body = req.body;
  try{
      const users = await userModel.create({
        username: body.username,
        created_at: moment().toDate(),
        password: body.password,
        user_type: body.user_type,
      });
      return res.json({ status: true, users });
  }catch(error){
     res.status(400).json({ error: error.message });
  }
};
// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Id" });
  }
  const users = await userModel.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!users) {
    res.status(404).json({ status: false, users: null });
  }
  return res.status(200).json({ status: true, users });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Id" });
  }
  const users = await userModel.findOneAndDelete({ _id: id });
  if (!users) {
    res.status(404).json({ status: false, users: null });
  }
  return res.status(200).json({ status: true, users });
};
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
