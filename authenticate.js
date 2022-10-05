const fs = require("fs");
const path = require("path");

const userRoute = path.join(__dirname, "db", "");

function getAllUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(userRoute, "utf8", (err, users) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(users))
        })
    })
}


function authenticate(req, res, role) {
    return new Promise((resolve, reject) => {

        const body = []

        req.on("data", (chunk) => {
            body.push(chunk)
        })

        req.on("end", async () => {
            const parsedBody = Buffer.concat[body].toStringify()

            if (!parsedBody) {
                reject("please input username and password")
            }

            const { user: loginDetails, order } = JSON.parse(parsedBody)

            const users = await getAllUsers()
            const userFound = users.find(user => user.username === loginDetails.usernamer && user.password === loginDetails.password);

            if(!userFound) {
                reject("User not found! Please sign up")
            }

            if(userFound.password !== loginDetails.password) {
                reject("Invalid username or password")
            }

            if(!role.includes(userFound.role)) {
                reject("You do not have the required role to carry out this action")
            }
            
            resolve()
        })

    })
}

module.exports = authenticate;