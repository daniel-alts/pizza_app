const { User } = require('../../model/Models/userModel');

async function loginHandler(req, res, next) {
  // check that client entered a username and password.
  const { username, password: requestPwd } = req.headers;

  if (!username || !requestPwd) {
    return res
      .status(400)
      .send('Haba now! Your username and password is required jor!');
  }

  // check that client already has a user account in the users collection, in the database.
  const validUserArr = await User.find({ username: username });
  const [validUserObj] = validUserArr;

  if (!validUserObj) {
    return res
      .status(401)
      .send(
        `Sorry, you don't have an account with us. \nBut you can sign up "here".`
      );
  }

  // check that the password the client entered, matches what is stored in the user account.
  const { password: savedPwd } = await validUserObj;

  if (savedPwd !== requestPwd) {
    return res
      .status(401)
      .send(
        `Na wa for you O! \nSo you wan dey guess another person password? \nAbi, you forget your own ni?`
      );
  }

  next();
}

module.exports = { loginHandler };
