const adminMiddleware = require("./adminMiddleware");
const authenticationMiddleware = require("./authenticationMiddleware");

module.exports = {
  auth: authenticationMiddleware,
  admin: adminMiddleware,
};
