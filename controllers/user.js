const userModel = require("../models/userModel");

// SIGN UP FOR USERS
const signupUser = async (req, res) => {

  try {
    const body = req.body;

    const newUser = await userModel.create({
      
        email: body.email,
        name: body.username,
        password: body.password,
    });

    return res.status(201).send({
      message: "You have been successfully registered",
      data: newUser,
    });
    
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//LOGIN FOR USERS

const loginUser = async (req, res, next) => {
  const { password, username } = req.body;

  if (!password || !username) {
    return res.status(400).send("Please provide your username and password!");
  }

  //CHECK IFUSER EXISTS IN DB
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(404).send("User not found. Please Sign up.");
  }

  if (user.password !== password) {
    return res.status(404).send("Please enter the correct password.");
  }

  return res.status(200).send("Login Successful");
};

module.exports = { signupUser, loginUser };