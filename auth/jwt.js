const jwt = require("jsonwebtoken");
const { Unauthenticated, NotFound } = require("../error");

const JWT_SECRET = 'JEWEL-SECRET-KEY= PLEASE STORE ME IN A .env file';

exports.signToken = (data) => {
    return jwt.sign({ ...data }, JWT_SECRET, { expiresIn: '2h' });

}

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);

};
