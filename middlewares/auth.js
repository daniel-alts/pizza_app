const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    if (!authorization) return res.status(403).send({ message: "Forbidden" });
    if (authorization) {
      const encoded = authorization.substring(6);

      const decoded = Buffer.from(encoded, "base64").toString("ascii");
      const [username, password] = decoded.split(":");

      const authenticatedUser = await userModel.findOne({ username });

      const match = await bcrypt.compare(password, authenticatedUser.password);
      if (!match) return res.status(403).send({ message: "Forbidden" });

      if (match) {
        req.authenticatedUser = {
          username: authenticatedUser.username,
          role: authenticatedUser.user_type,
        };
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error occurred" });
  }
};
