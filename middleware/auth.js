

const authtenticateUser =  async (req,res,next) =>{  
     try {
        const Token = req.headers.authorization.split(" ")[1]

            if (!Token) {
                res.status(401).send("UnAuthorized user Pls register....");
            }

            if (Token) {
                next(); 
            }  
    } catch (error) {
        console.log(error.message);
        res.status(401).send(error.message)
    }
    
}

module.exports = authtenticateUser

