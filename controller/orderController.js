const orders = require("../model/order");

//Perform CRUD operations
//GET all orders

exports.all_orders = (req, res) => {
  orders
    .find({})
    .then((order) => {
      res.status(200).send(order);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
