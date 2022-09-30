const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      status: false,
      message: "Provide required fields",
    });
  }

  /* Check if user exists */
  userModel
    .findOne({ username: username })
    // .select('+password')
    .then(async (user) => {
      /* check if password matches */
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) throw "Invalid username or password";

      delete user.password

      /* assign token */
      const token = jwt.sign(
        {
          username: user.username,
          timestamp: Date.now(),
          type: user.user_type,
        },
        process.env.JWT_AUTH_SECRET
      );

      if (!token) throw "Unable to set token";

      res.json({
        status: true,
        user,
        token,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        message: error,
      });
    });
};

const signup = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) throw "Provide required fields";

    /* hash password */
    password = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password,
    });

    res.json({
      status: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  signin,
  signup,
};
