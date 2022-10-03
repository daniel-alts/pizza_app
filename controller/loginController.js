const UserModel = require('../model/userModel');

async function loginUser(req, res) {
  const { email, password } = req.headers;

  const user = UserModel.find({
    email: email,
    password: password,
  })
    .then((user) => {
      if (user.length === 0) {
        res.send('User does not exist');
        return;
      }
      const { firstName, lastName, user_type } = user[0];
      console.log(firstName, lastName);
      res.send(`Welcome ${user_type}, ${firstName} ${lastName}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error ');
    });
}

module.exports = { loginUser };

//  `Welcome ${user.user_type}, ${user.firstName} ${user.lastName}`
