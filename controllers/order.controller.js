const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price * curr.quantity; // price * quantity
    return prev
  }, 0);

  const order = await Order.create({
    items: body.items,
    total_price,
    user: req.user.id
  })

  return res.status(201).json({ status: true, order })
}

exports.getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('user');

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  return res.status(200).json({ status: true, order })
}

exports.getAllOrders = async (req, res) => {
  const createdAt = req.query.created_at === 'asc' ? 1 : -1;

  let sort = { createdAt }
  if (req.query.total_price) {
    sort.total_price = req.query.total_price === 'asc' ? 1 : -1;
  }

  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const skip = (page - 1) * limit;
  const total = await Order.countDocuments();
  const total_pages = Math.ceil(total / limit);

  const orders = await Order
    .find({ user: req.user.id })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('user');

  return res.status(200).json({ status: true, orders, total, total_pages })
}

exports.patchOrder = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, error: 'Order does not exist' })
  }

  if (req.user.id !== order.user.toString()) {
    return res.status(403).json({ status: false, error: 'unauthorized' })
  }

  if (state < order.state) {
    return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
  }

  order.state = state;

  await order.save()

  return res.status(200).json({ status: true, order })
}

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, error: 'Order does not exist' })
  }

  if (req.user.id !== order.user.toString()) {
    return res.status(403).json({ status: false, error: 'unauthorized' })
  }

  const _order = await Order.deleteOne({ _id: id })

  return res.json({ status: true, order: _order })
}