const createTokenUser = (user) => {
    return {
        name: user.username,
        userId: user. _id,
        userType: user.user_type,
    }
}
 

module.exports = createTokenUser;