const express = require("express");
const orderModels = require("../model/orderModel");
const UserType = require("../routes/Auth");

const orderRouter = express.Router();

const moment = require("moment");
const userttyp = UserType.usertype;

// orderRouter.get("/", (req, res) => {
//   return res.json({ status: true });
// });

//GET ALL ORDERS
orderRouter.get("/", (req, res) => {
  orderModels
    .find()
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });

  // res.json({ status: true, orders });
});

//CREATE NEW ORDER
orderRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log(userttyp);
  // const usertype = req.query.usertype;

  // if (!usertype) {
  //   res.status(404).send("Please Enter Your user type!");
  // }

  if (userttyp === "admin") {
    const total_price = 5;
    //body.items.reduce((prev, curr) => {
    //   prev += curr.price;
    //   return prev;
    // }, 0);

    // orderModels
    //   .create(body)
    //   .then((result) => {
    //     res.status(201).send(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const order = await orderModels.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });

    return res.json({ status: true, order });
  } else {
    res.status(500).send("This User cannot create orders!");
  }
});

//GET ORDER BY ID
orderRouter.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  orderModels
    .findById(orderId)
    .then((result) => {
      console.log(result.password);
    })
    .catch((err) => {
      console.log(err);
    });

  // const body = req.body;
  // const password = body.password;
  // console.log(password);

  // const order = await orderModels.findById(orderId);

  // if (!order) {
  //   return res.status(404).json({ status: false, order: null });
  // }

  // return res.json({ status: true, order });
});

//UPDATE ORDER BY ID
orderRouter.patch("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModels.findById(id);

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

  return res.json({ status: true, order });
});

//DELETE ORDER BY ID
orderRouter.delete("/order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await orderModels.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

module.exports = orderRouter;
