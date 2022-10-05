const userModel = require('../models/userModel')

async function registerNewUser(req, res){
    const {username, password, phonenumber, address, userType} = req.body

    const userObj = {username, password, phonenumber, address, userType}
    
    try {
        const user = await userModel.create(userObj)
        res.json({ message: "registration successful" })
        console.log(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const login = async (req, res)=>{
    const {username, password, userType} = req.body;

    try {
        const user = await userModel.findOne({ username: username, password: password, userType: userType })

       

        if (!user) {
            return res.json({ message: "No Input" })
        }
        
    } catch (error) {
        res.status(500).send(error)
    }

        res.status(200).send("login successful")
    

}





module.exports = { registerNewUser, login}