const User = require("./models/user")

async function authenticate(user) {
    const { username, password } = user

    if (!username || !password) throw new Error("Incomplete query")

    const u = await User.findOne({
        username: username,
    }).exec()

    if (!u) {
        throw new Error("User not found")
    }

    if (u.password !==  password) throw new Error("Invalid password")

    return u
}

module.exports = authenticate