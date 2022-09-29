const User = require('./userModel');

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      return user;
    }
    return;
}

module.exports = {authenticate};