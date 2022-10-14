const { verifyToken } = require("../utils/util");
const authenticationMiddleware = (req, res, next) => {
  const token = req.cookies;
  if (!token) {
    throw new Error(
      "Invalid request, please ensure you are logged in to access this route"
    );
  }
  try {
    const { id, username } = verifyToken(token);
    req.user = { id, username };
  } catch (err) {
    console.error(err);
  }
};
module.exports = authenticationMiddleware;
