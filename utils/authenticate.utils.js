function authenticateUser(req, res, next) {
	// get user details
	const user = req.session.user;

	// check if user is logged in
	if (!user) {
		return res.status(401).send("Please login to access this resource");
	}

  next();
}

function authorize(roles = []) {
	return [
		(req, res, next) => {
			if (roles.length && !roles.includes(req.session.user.user_type)) {
				// user's role is not authorized
				return res
					.status(401)
					.send("You are not authorized to access this resource");
			}

			// authentication and authorization successful
			next();
		},
	];
}

module.exports = { authenticateUser, authorize };
