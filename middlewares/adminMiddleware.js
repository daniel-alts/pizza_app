async function adminMiddleware(req, res, next) {
  try {
    if (req.user && req.user.user_type === "admin") {
      return next();
    }

    throw new Error("Unauthorized Request");
  } catch (err) {
    return res.status(403).json({
      status: "Unauthorized",
      message: err.message,
    });
  }
}

module.exports = adminMiddleware;
