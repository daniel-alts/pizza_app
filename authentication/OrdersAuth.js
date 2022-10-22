const Users = require('../schemas/usersModel')
const db = require('../testingS/db.json')

const userAuthenticator = (req, res) => {
    return new Promise(async (resolve, reject) => {
        const username = req.url.split(/[=|&]+/)
        const password = req.url.split(/[=|&]+/)

        console.log(username, password);

        if (!username) {
            reject('Username not found!')
            return;
        }

        let user = await Users.findOne({ username: username })

        if (password !== user.password) {
            reject('Username or password incorrect, Try Again!')
        }

        const userType = user.user_type

        if (userType !== 'admin') {
            reject('You are not authorized to this route!')
        }
        resolve()
    })
}


module.exports = userAuthenticator