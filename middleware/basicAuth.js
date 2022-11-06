//const BasicAuth = (req, res, next) => {
    //const authheader = req.headers.authorization;
 const basicAuth = (req, res, next) => {
    const authheader = req.headers.authorization;
       if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
 
    //console.log({ authheader })
    const auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');

    console.log({ auth })
    const user = auth[0];
    const pass = auth[1];
 
    if (user == 'admin' && pass == 'password') {
        // If Authorized user
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
}

module.exports = basicAuth;
