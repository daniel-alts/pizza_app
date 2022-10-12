const User = require("../models/user");

async function authenticate(username, password) {
    if (!username || !password) throw new Error("Incomplete query");

    const user = await User.findOne({ username: username });

    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) throw new Error("Invalid password");

    return user;
}

module.exports = authenticate;
