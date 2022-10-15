/**
 * authenticate() - checks if user is authenticated and
 * also checks the role of user
 *
 * @roles: accepted roles for the route
 *
 * Return: Nothing
 * If no token, return Unauthorized, login or signup
 * If userType not in roles, return You are not permitted
 * to access this route
 */
function authorise(roles) {
  return (req, res, next) => {
    const { userType } = req.user;
    if (!roles.includes(userType)) {
      return res.status(401).json({
        status: false,
        message: 'You are not permitted to access this route',
      });
    }

    next();
    return true;
  };
}

module.exports = authorise;
