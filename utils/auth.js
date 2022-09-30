const orderModel = require('../models/orderModel');

function getAllUsers(){
    const users = orderModel.find()

    return res.json({ status: true, users: users })
}

const authenticate = async (req, res, next) => {
    return new Promise ((resolve, reject) => {
        const body = []

        req.on('data', (chunk) => {
            body.push(chunk)
        })

        req.on("end", async () => {
            const parsedBody = Buffer.concat(body).toString()
            
            if (!parsedBody) {
                reject ("no username or password provided")
            }

            const loginDetails = JSON.parse(parsedBody)

            const users = await getAllUsers()

            const userFound = users.find((user) => {
                return user.username === loginDetails.username
            })

            if (!userFound) {
                reject ("user not found, please sign up")
            }

            if (userFound.password !== loginDetails.password) {
                reject("Invalid username or password")
            }

            resolve()
        })
        next();
    })
}

module.exports = authenticate