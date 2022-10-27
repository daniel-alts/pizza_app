function BasicAuth(req, res, next) {
    const authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {

        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('You are not authenticated!')
    }
 
    const auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];
 
    if (user == 'admin' && pass == 'password') {
 
        // If Authorized user
        next();
    } else {
     
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('You are not authenticated!')
    
    }
 
}

module.exports = BasicAuth