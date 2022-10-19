const moment = require('moment');
const OrderModel = require('../model/orderModel');


function getOrders(req, res) {
  OrderModel.find({})
    .then((order) => res.status(200).send(order))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error fetching orders');
    });
}

function getOrderByID(req, res) {
  const id = req.params.id;
  OrderModel.findById(id)
    .then((order) => res.status(200).json(order))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error fetching orders');
    });
}

function createOrder(req, res) {
  const body = req.body;
  const total_price = body.items.reduce((prev, curr) => {
    const total = prev + curr.price;
    return total;
  }, 0);

  OrderModel.create({
    items: body.items,
    created_At: moment().toDate(),
    total_price,
    state: body.state ? body.state : null
  })
    .then((order) => res.status(200).json(order))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error fetching orders');
    });
}

function deleteOrderbyId(req, res) {
  const id = req.params.id;

  OrderModel.findByIdAndDelete(id)
    .then(() => res.status(200).send('deletion complete'))
    .catch((err) => {
      console.log(err);
      res.status(500).send(' failed');
    });
}

function updateOrder(req, res) {
  const id = req.params.id;
  const state = req.body.state;

  OrderModel.findByIdAndUpdate({ _id: id }, { $set: { state } })
    .then((order) => res.status(200).json(order))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error fetching orders');
    });
}

function sortOrderByPrice(req, res) {
  OrderModel.find({})
    .sort({ total_price: 1 })
    .exec((err, model) => {
      res.send(model);
    });
}
function sortOrderByDate(req, res) {
  OrderModel.find({})
    .sort({ created_At: 1 })
    .exec((err, model) => {
      res.send(model);
    });
}

function paginate(req, res) {
  const { page = 1, limit = 2 } = req.query;

  OrderModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
    .then((orders) =>
      res.json({
        orders,
        totalPages: Math.ceil(orders / limit),
        currentPage: page,
      })
    )
    .catch((err) => console.log(err));
}

module.exports = {
  getOrders,
  createOrder,
  deleteOrderbyId,
  getOrderByID,
  updateOrder,
  sortOrderByPrice,
  sortOrderByDate,
  paginate,
};
