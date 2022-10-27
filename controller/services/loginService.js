const { User } = require('../../model/Models/userModel');
const { compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

async function authVerification(req, res, next) {
  const token = req.cookies.bolanle; // I've used bolanle instead of jwt, purely for learning purpose
  console.log(token);
  if (token) {
    verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        loginHandler(req, res, next);
      } else {
        console.log('Token successful');
        console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log('No token');
    loginHandler(req, res, next);
  }
}

async function loginHandler(req, res, next) {
  // check that client entered a username and password.
  const { username, password: requestPwd } = req.headers;

  if (!username || !requestPwd) {
    return res
      .status(400)
      .send('Haba now! Your username and password is required jor!');
  }

  // check that client already has a user account in the users collection, in the database.
  const validUserArr = await User.find({ username });
  const [validUserObj] = validUserArr;

  if (!validUserObj) {
    return res
      .status(401)
      .send(
        `Sorry, you don't have an account with us. \nBut you can sign up "here".`
      );
  }

  // check that the password the client entered, matches what is stored in the user account.
  const { password: savedPwd } = validUserObj;

  const auth = await compare(requestPwd, savedPwd);

  if (!auth)
    return res
      .status(401)
      .send(
        'Na wa for you O! \nSo you wan dey guess another person password? \nAbi, you forget your own ni?'
      );

  // if (savedPwd !== requestPwd) {
  //   return res
  //     .status(401)
  //     .send(
  //       `Na wa for you O! \nSo you wan dey guess another person password? \nAbi, you forget your own ni?`
  //     );
  // }

  const maxAge = 3 * 24 * 60 * 60 * 1000;
  function createToken(id) {
    return sign({ id }, process.env.JWT_SECRET, {
      expiresIn: maxAge / 1000,
    });
  }

  const token = createToken(validUserObj._id);
  res.cookie('bolanle', token, { maxAge }); // I've used bolanle instead of jwt, purely for learning purpose

  next();
}

module.exports = { loginHandler, authVerification };
