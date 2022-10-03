const User = require('../resources/user/user.model')

const protectRoute = async (
	req,
	res,
	next,
) => {
	const header = req.headers
	if (!header.authorization) {
		return res
			.status(403)
			.send({ message: 'Forbidden' })
	}
	let token =
		header.authorization.split(
			'Basic ',
		)[1]
	if (!token) {
		return res.status(401).end()
	}

	try {
		const decoded = Buffer.from(
			token,
			'base64',
		).toString('ascii')
		const [username, password] =
			decoded.split(':')
		const authenticatedUser =
			await User.findOne({ username })
		const match =
			await authenticatedUser.comparePassword(
				password,
			)
		if (match) {
			req.authenticatedUser = {
				username:
					authenticatedUser.username,
				role: authenticatedUser.user_type,
			}
		}
		next()
	} catch (err) {
		console.log('Forbidden')
		// console.log(err)
		return res
			.status(401)
			.send({ message: 'forbidden' })
	}
}

const signUp = async (req, res) => {
	const body = req.body
	if (!body.username || !body.password) {
		return res.status(400).send({
			success: false,
			error: {
				message:
					'email and password required',
			},
		})
	}
	try {
		const user = await User.create(body)
		const createdUser = {
			username: user.username,
			user_type: user.user_type,
		}
		console.log(createdUser)
		return res
			.status(201)
			.json({ data: createdUser })
	} catch (err) {
		console.log(err)
		res.status(400).send({
			message: 'unable to create user',
		})
	}
}

module.exports = {
	protectRoute,
	signUp,
}
