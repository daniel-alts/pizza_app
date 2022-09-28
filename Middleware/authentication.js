const userModel = require('../Users/model')

const authentication = async (req, res, next)=> {
	const authheader = req.headers.authorization;

	if (!authheader) {
		const err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

	let auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
	const username = auth[0];
	const password = auth[1];

    const user = await userModel.findOne({ username })
    if(!user){
        let err = new Error('This user does not exist');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
    }
	if (user.password !== password){
        let err = new Error('Invalid Credentials');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
    } 
    next();
}

module.exports = authentication