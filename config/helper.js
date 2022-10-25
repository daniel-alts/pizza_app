const argon2 = require("argon2")
const userModel = require("../models/userModel")


async function hashPassword(string) {
    const hash = await argon2.hash(string)
    console.log(hash)
    return hash
}

async function compareHashedPassword(hashedPassword, plainPassword) {
    return await argon2.verify(hashedPassword, plainPassword)
}

async function verifyUser(identity, password) {
    let user = await userModel.findOne({ username: identity })
    if (!user) {
        return false
    }
    let verifyPassword = compareHashedPassword(user.password, password)
    if (!verifyPassword) {
        return false
    }
    return user
}

module.exports = {
    hashPassword,
    compareHashedPassword,
    verifyUser
}