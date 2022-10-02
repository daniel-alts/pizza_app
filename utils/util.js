const { sign, verify } = require("jsonwebtoken");
const createJWTUser = (user) => {
  return { id: user._id, username: user.username };
};

const createJWT = ({ payload }) => {
  return sign(payload, "authprivatetoken140402");
};
const verifyToken = (token) => {
  return verify(token, "authprivatetoken140402");
};
const attachCookiesToResponse = ({ res, payload }) => {
  const token = createJWT({ payload });
  const sixHours = 6 * 60 * 60 * 1000;
  res.cookie("access-token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + sixHours),
  });
};
module.exports = {
  createJWTUser,
  createJWT,
  verifyToken,
  attachCookiesToResponse,
};
