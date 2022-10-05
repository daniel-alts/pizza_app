const orderModel = require("../models/orderModel");
const moment = require("moment");

const userModel = require("../models/userModel");

async function createOrder(req, res) {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
  });

  res.status(201).send(order);
}

const getOrderById = async (req, res, next) => {
  // check for authenticated user
  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const orderId = req.params.id;
  const order = await orderModel.findById(orderId);
  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }
  return res.json({ status: true, order });
};

async function getOrders(req, res, next) {
  let orders;
 
  const authenticatedUser = req.authenticatedUser;

   if(!authenticatedUser){
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
}

  if (authenticatedUser.role !== "admin"){
    return res.status(401).send({ message: "Unauthorized" });
  }
  const price = req.query.price
  if (price){
    const value = price =='asc'?1:price=='desc'?-1:false
    if (value){
        await orderModel.find().then((allOrders)=>{
            res.status(200).send(allOrders)
        }).catch((err)=>{

            res.status(500).send({
                message:'Wrong query',
                data:err
            })
        })
    }
  }
  if (!orders) {
    await orderModel
      .find()
      .then((allOrders) => {
        res.status(200).send(allOrders);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
} 
async function updateById(req, res) {
  const id = req.params.id;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  await order.save();

  res.status(200).send(order);
}

async function deleteOrderById(req, res) {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  res.status(200).send({
    message: "Order Deleted",
  });
}

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateById,
  deleteOrderById,
};
