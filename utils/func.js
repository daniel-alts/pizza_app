module.exports.getPagination = (page, perPage) => {
  const limit = perPage ? +perPage : 3;
  const offset = page ? (page - 1) * perPage : 0;

  return { limit, offset };
};
