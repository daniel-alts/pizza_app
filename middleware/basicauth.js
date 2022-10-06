const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/userModel");

// get config vars
dotenv.config();

const requireAuth = async (req, res, next) => {
  //verify authentication

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(402).json({ error: "Authorization required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    consolr.log(error);
    res.status(401).json({ error: "request not  authorized" });
  }
};

module.exports = requireAuth;
