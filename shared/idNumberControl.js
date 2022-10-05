module.exports = (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
      throw new("id not found");
    }
    next();
  }