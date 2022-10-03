const userModel = require("../models/userModel");

// const login = (req, res, next) => {};

// SIGNING FOR USERS
const signupUser = async (req, res) => {
  //   console.log(body);

  try {
    const body = req.body;

    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).send({
      message: "User has been succesfully signed up",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//LOGIN FOR USERS

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).send("Please provide email and password!");
  }

  //CHECK IF A USER EXIST THE DB USING HIS EMAIL
  const user = await userModel.findOne({ email });

  // IF THE USER DOES NOT EXIST
  if (!user) {
    return res.status(404).send("User not found. Please Sign up");
  }

  if (user.password !== password) {
    return res.status(404).send("User not found. Please Sign up");
  }

  //IF THE USER EXIST THEN HE/SHE CAN LOGIN
  return res.status(200).send("Login Successful");
};

module.exports = { signupUser, loginUser };
