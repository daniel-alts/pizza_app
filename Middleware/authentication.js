require("dotenv").config()

const API_KEY = process.env.API_KEY

function authenticateRoute(req, res){
  return new Promise((resolve, reject)=>{
    let token = req.headers.authorization
        token = token.split(" ")[1]

        if (!token) {
            reject("No token provided");
        }

        if (token !== API_KEY) {
            reject("Invalid token");
        }

        resolve();
  })
}

module.exports = {
  authenticateRoute
}