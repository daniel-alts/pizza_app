const userModel = require("../models/userModels");

// AN AUTHENTICATION TO PROTECT THE ORDER ROUTES
const authenticateUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  //   console.log(authorization);

  if (!authorization) {
    return res.status(403).send({ message: "Forbidden" });
  }
  // return res.status(403).send({ message: "Forbidden" });
  //Basic cHJvc3BlckBnbWFpbC5jb206aGRnZGdkZGhkaGRoZA==
  const encoded = authorization.substring(6);

  const decoded = Buffer.from(encoded, "base64").toString("ascii");

  const [username, password] = decoded.split(":");

  // console.log(email, password);

  const authenticatedUser = await userModel.findOne({ username });

  if (!authenticatedUser) {
    return res.status(404).send({ message: "User not found" });
  }

  if (authenticatedUser.password !== password) {
    return res.status(404).send({ message: "password is incorrect" });
  }

  //   req.authenticatedUser = authenticatedUser;

  next();
};

module.exports = { authenticateUser };