const basicAuthentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(403)
      .json({ status: 'access denied', msg: "You're yet to be authenticated" });
    return;
  }
  next();
};

module.exports = { basicAuthentication };
