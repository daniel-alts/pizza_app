require('dotenv').config();

function authenticate(roles) {
  return (req, res, next) => {
    if (!process.env.TOKEN) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized, login or signup',
      });
    }

    if (!roles.includes(process.env.USER_TYPE)) {
      return res.status(401).json({
        status: false,
        message: 'You are not permitted to access this route',
      });
    }

    next();
  };
}

module.exports = authenticate;
