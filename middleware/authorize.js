const authorize = async (req, res) => {
  const { user_type } = req.body.user;
  if (user_type !== "admin")
    return res
      .status(403)
      .send("You do not have the authorization to perform this action");
  next();
};
