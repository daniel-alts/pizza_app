  
  const userModel = require('../models/userModel')
  
  function authentication(req, res, ) {
       new Promise(async(resolve,reject)=>{
        const {username, password, userType} = req.body
        if(!username || !password){
            reject("invalid username or password")

            const user = await userModel.findOne({username: username, password: password})
            if(!user){
                reject("user not found")
            }
        }
        if(userType !== "admin"){
            reject("you are not authorised to access this resource")
        }
        else resolve("authorised")
    })
  }


module.exports = { authentication }

// require("dotenv").config()
// // console.log(process.env.API_KEY)
// const TOKEN = process.env.API_KEY

// function authenticateUser(req, res) {
//     console.log(req.headers)
//     return new Promise((resolve, reject) => {
//         let token = req.headers.authorization
//         token = token.split(' ')[1]
//         if (!token) {
//             reject("no token provided")
//         }
//         // console.log(token)
//         if (token !== TOKEN) {
//             reject("invalid token")
//         }
//         resolve()
//     })
// }



// module.exports = {
//     authenticateUser
// }