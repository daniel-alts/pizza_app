

const authenticate = (req, res, next)=>{
    var authenticateHeader = req.headers.authorization
    if(!authenticateHeader){
        return res.status(404).json({ status: false, message: 'Please provide username and password in the Authorization header' })
    }
    var auth = new Buffer.from(authenticateHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1]
    if (username == 'admin' && password == 'password'){
        return next()
    }
    else{
        return res.status(403).json({ status: false, message: 'You are an unauthorized user' })  
    } 
}

module.exports = authenticate;