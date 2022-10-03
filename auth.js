function authorizeAdmin(req, res, next) {
  const authheader = req.headers.role;

  if (!authheader || authheader === 'user') {
    res
      .status(400)
      .send(
        `You are not authorized to perform this action, state your role in 'headers'`
      );
    return;
  }

  next();
}

module.exports = authorizeAdmin;
