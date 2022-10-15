const { BadRequest, BrokenCode, Unauthenticated, NotFound } = require("../error");
const User = require("../user/model");
const { signToken, verifyToken } = require("./jwt");


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) return BadRequest(res, 'username and password is required!');

        const user = await User.findOne({ username });

        if (!user || !(await user.verifyPassword(password))) return BadRequest(res, 'Invalid username or password! Please try again.');

        const token = signToken({ _id: user._id });

        res.setHeader('authorization', token);

        res.status(200).json({
            status: true,
            message: 'You have logged in successfully!'
        })
     } catch (error) {
        console.log(error);
        BrokenCode(res);
    }
}

exports.authenticate = async (req, res, next) => {
    const authHeader = req.header("Authorization");

  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      let decoded;

      try {
        decoded = verifyToken(token);

      } catch (error) {
        console.log(error);
        return Unauthenticated(res, "Invalid Authentication! Please Log In.");
      }
      
      const user = await User.findOne({
        _id: decoded._id,
      });

      if (!user) {
        return NotFound(res, 'User Not Found!');
      }

      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      BrokenCode(res);
    }
    
  } else {
    return Unauthenticated(res);
  }
}