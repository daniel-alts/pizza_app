const usereModel = require("../models/userModel");

exports.test = (req, res) => {
  try {
    res.status(200).json({ message: "hello" });
  } catch (error) {
    res.status(404).json({ mesage: "error", error });
  }
};
exports.addUser = async function (req, res) {
  try {
    const userDetails = req.body;
    await usereModel.create(userDetails);
    return res.status(201).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateUser = async function (req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const userDetails = req.body;
    console.log(userDetails);

    const user = await usereModel.findById(userId);
    // console.log(user)
    if (!user) {
      return res.status(404).json({ status: false, order: null });
    }
    await usereModel.findByIdAndUpdate(userId, userDetails, {
      runValidators: true, // Runs validations for the updated fields
    });

    return res.json({ status: true });
  } catch (error) {
    res.status(404).json({ message: "user update unsuccessful", error });
  }
};
exports.deletaAllUsers = async function (req, res) {
  try {
    console.log(req.params);
    const { userId } = req.params;

    const order = await usereModel.deleteOne({ _id: userId });

    return res.json({ status: true, order });
  } catch (error) {
    res.status(401).json({ message: "user deletion failed", error });
  }
};
exports.getAllUsers = async function (req, res) {
  try {
    // res.status(200);
    const users = await usereModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Error!!!" });
  }
};
exports.getAllUsersById = async function (req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const order = await usereModel.findById(userId);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, order });
  } catch (error) {
    return res.status(404).json({ message: "can't get user by id", error });
  }
};
