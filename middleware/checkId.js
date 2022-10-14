module.exports = (req, res, next) => {
  const userOrders = req.user.orders.map(order => {
    return order.toString()
  })
  const check = userOrders.includes(req.params.id)
  if (!check) {
    return res.status(403).json({
      error: 'unauthorised'
    })
  }
  next()
}
