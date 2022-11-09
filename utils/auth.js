const userModel = require('../models/userModel');

const users = [];
// get all users from db
function getAllUsers(){
    const users = userModel.find()

    return res.json({ status: true, users: users })
}

const  findByUsername = async (username) =>  {
    // Console.log the return value of user. 
    // If it returns null for "not found ", the function should return false. If it returns anything else handle the errors.....

    // if it returns the user, the function should return true.

    const user = await userModel.findOne({
        where: {
            username: username
        }
    })


    console.log("user ", user)

    return user ? user : false; 
}

// authenticate users
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

            const userFound = await findByUsername(user.username)

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