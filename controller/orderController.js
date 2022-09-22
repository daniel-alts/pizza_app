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

//CREATE Orders
exports.create_order = (req, res) => {
  const order = req.body;

  const total_price = order.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  orders
    .create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    })
    .then((order) => {
      res.status(200).send({
        message: "Your Order has been created Successfully",
        body: order,
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
