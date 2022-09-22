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

//GET orders by ID
exports.order_by_id = (req, res) => {
  const id = req.params.id;
  orders
    .findById(id)
    .then((order) => {
      res.status(200).send(order);
    })
    .catch(() => {
      res.status(400).send({ message: "Order not found" });
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

//UPDATE Orders
exports.update_order = (req, res) => {
  const id = req.params;
  const state = req.body;

  orders
    .findByIdAndUpdate(id, state, { new: true })
    .then((order) => {
      res.status(200).send(order);
    })
    .catch(() => {
      res.status(400).send(err.message);
    });
};

//DELETE Orders
exports.delete_order = (req, res) => {
  const id = req.params.id;
  orders
    .findByIdAndDelete(id)
    .then((order) => {
      res.status(200).send({ message: "Order deleted Successfully" });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
