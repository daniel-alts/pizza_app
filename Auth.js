const userModel = require("./models/userModel")
const auth = require("basic-auth")


const Auth = async(req, res, next)=>{
    const {name , pass} = auth(req)

    if(!(name || pass)){
        // res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        return res.status(400).send({message: "input username and password in header"})
    }

    

    const allusers = await userModel.find()
    const findUser = allusers.find(user => user.username == name && user.password == pass)
    

    if(findUser){
        return next()

    }
    else{
        res.status(401).send({message: "invalid login"})
    }


}

module.exports = Auth