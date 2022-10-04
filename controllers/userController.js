const userModel = require("../models/userModel");

exports.authenticateUser = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;
    const { authorization } = req.headers;
    // console.log(req.headers);
    // Check if the authorization header is present
    if (!authorization) {
      let error = new Error("You are not authenticated");
      res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
      return next(error);
    }
    // Get the credentials from the authorization header
    let userAuth = new Buffer.from(authorization.split(" ")[1])
      .toString()
      .split(":");
    // console.log(userAuth);

    // checking if the credentials are present
    let username = userAuth[0];
    let password = userAuth[1];

    // Checking if the credentials are correct
    const user = await userModel.findOne({
      username: username,
      password: password,
    });

    if (!user) {
      res.status(401).json({
        status: "failed",
        message: "Unauthorized, Invalid Credentials",
      });
      next(
        new Error(
          "Wrong username or password. Enter a valid username and password"
        )
      );
    }
    // If the credentials are correct, then the user is authenticated and can access the order route
    console.log(
      "You are auntheticated successfully. You can access the order route"
    );
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log("Users", users);
    res.status(200).json({ status: true, users });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await userModel.create(body);
    console.log("User", user);
    res.status(201).json({ status: true, user });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(400).json({ status: false, error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    console.log("User", user);
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (Object.keys(body).length === 0) {
      return res
        .status(400)
        .json({ status: false, error: "Please provide data to update" });
    }
    const user = await userModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    console.log("User", user);
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndRemove(id);
    res.status(200).json({ status: true, user: null });
  } catch (error) {
    console.log("Deleted successfully");
    return res.status(500).json({ status: false, error: error.message });
  }
};
