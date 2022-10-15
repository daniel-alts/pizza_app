const userModel = require("../models/userModel");

exports.getAllUsers = async function (req, res) {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      success: true,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.createUser = async function (req, res) {
  console.log(req.body);
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Bad request!",
      });
    }

    const user = await userModel.create(body);

    return res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.updateUser = async function (req, res) {
  try {
    const { userId } = req.params;

    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.username !== req.user.username) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! You cannot alter another user details!",
      });
    }

    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Bad request!",
      });
    }

    user = await userModel.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.deleteUser = async function (req, res) {
  try {
    const { userId } = req.params;

    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (req.user.user_type !== "admin" && user.username !== req.user.username) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! You cannot delete another user account!",
      });
    }

    user = await userModel.findByIdAndDelete(userId);
    console.log(user);

    return res.status(204).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};