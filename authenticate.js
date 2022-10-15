const userModel = require("./model/userModel");



async function authenticateUser (req, res, next) {
    const authHeader = req.headers.authorization
    console.log(req.headers)


    if (!authHeader) {
        const err = res.status(401).json({ message: "you are not authenticat" });
        //res.setHeader('WWW-Authenticate', 'Basic')
        return next (err)
    }

    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const name = auth[0]
    const pass = auth[1]
    const authUser = await userModel.find({username: name})
    console.log(authUser)
    // console.log(authUser[0].username)
    // console.log(authUser[0].password);
    // console.log(pass)
    // console.log(name)
    if (authUser == ''){
      const err = res.status(401).json({ message: "please input details" });
      return next(err);
    }
    if (authUser[0].password == pass && authUser[0].usertype == "Admin") {
      return next()
    } else {
       const err = res.status(401).json({ message: "you are not authenticated" });
       return next(err)
    }

    // const allUsers = await userModel.find()
    // const userFound = allUsers.find( user => {user[0].username == name && user[0].password == pass})
    // if(!userFound){
    //       const err = res.status(401).json({ message: "you are not authenticated" });
    //       return next(err);
    // } else {
    //   return next()
    // }

    
}


module.exports = authenticateUser