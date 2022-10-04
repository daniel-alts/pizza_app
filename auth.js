const usersModel = require('./models/usersModel')

async function auth(req, res){

    const { username, password } = req.headers

    try {
        const userData = await usersModel.findOne({username: username, password: password})
        
        if (!userData){
            throw new Error("invalid authentication credentials")
        }
            
        else {
            return userData.user_type
        }
        
    }
        
    catch (err){
        console.log(err)
    }        
    
}  

module.exports = { auth }