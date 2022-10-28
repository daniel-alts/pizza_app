const basicAuth = (req, res, next) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic')
        res.status(401).send({
            message: 'You are not authorized'
        })    
    }

    const auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
    const user = auth[0];
    const password = auth[1];

    if (user == 'admin' && pass == 'password') {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic')
        res.status(401).send({
            message: 'You are not authorized'
        })  
    }
}


module.exports = basicAuth