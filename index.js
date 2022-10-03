const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const orderModel = require("./orderModel");

const usersModel = require("./userModel");
const auth = require("./authenticate");
const PORT = 3334;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post("/user", async (req, res) => {
  const body = req.body;
  console.log(body);
  const user = await usersModel.create(body);

  return res.json({ status: true, user });
});

app.get("/", (req, res) => {
  var authheader = req.headers.authorization;
  var auths = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auths[0];
  var pass = auths[1];
  console.log(`user ${user}`);
  console.log(pass);

  auth
    .authenticate(user, pass)
    .then(() => {
      return res.json({ status: true });
    })
    .catch((erro) => {
      return res.writeHead(400).end(
        JSON.stringify({
          message: erro,
        })
      );
    });
});

app.post("/order", async (req, res) => {
  var authheader = req.headers.authorization;
  var auths = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auths[0];
  var pass = auths[1];
  console.log(`user ${user}`);
  console.log(pass);

  auth
    .authenticate(user, pass)
    .then(async () => {
      const body = req.body;
      console.log(`this is ${body.total_price}`);

      const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price;
        return prev;
      }, 0);
      console.log(`this is ${total_price}`);

      const order = await orderModel.create({
        items: body.items,
        state: body.state,
        created_at: moment().toDate(),
        total_price,
      });

      return res.json({ status: true, order });
    })
    .catch((erro) => {
      return res.writeHead(400).end(
        JSON.stringify({
          message: erro,
        })
      );
    });
});

app.get("/order/:orderId", async (req, res) => {
  var authheader = req.headers.authorization;
  var auths = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auths[0];
  var pass = auths[1];
  console.log(`user ${user}`);
  console.log(pass);

  auth
    .authenticate(user, pass)
    .then(async () => {
      const { orderId } = req.params;
      const order = await orderModel.findById(orderId);

      if (!order) {
        return res.status(404).json({ status: false, order: null });
      }

      return res.json({ status: true, order });
    })
    .catch((erro) => {
      return res.writeHead(400).end(
        JSON.stringify({
          message: erro,
        })
      );
    });
});

app.get("/orders", async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  console.log(req.body.state);

  var authheader = req.headers.authorization;
  var auths = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auths[0];
  var pass = auths[1];

  console.log(`user ${user}`);
  console.log(pass);
  console.log(req.params);

  auth
    .authenticate(user, pass)
    .then(async () => {
      const orders = await orderModel.find();
      const count = await orderModel.countDocuments();

      //sorting with order total price in ascending order
      let ascPrice = orders.sort((f, s) => f.total_price - s.total_price);

       //sorting with order date created at in ascending order
      let ascDate = orders.sort((f, s) => f.created_at - s.created_at);

      //quering the order db by state 
      const orderFound = orders.filter((user) => {
        return user.state === req.body.state;
      });

       //paginating the orders get request
      const paginatedOrders = await orderModel
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        
      console.log(`pag ${paginatedOrders}`);
      console.log(count);
      return res.json({ status: true, paginatedOrders });
    })
    .catch((erro) => {
      return res.writeHead(400).end(
        JSON.stringify({
          message: erro,
        })
      );
    });
});

app.patch("/order/:id", async (req, res) => {
  var authheader = req.headers.authorization;
  var auths = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auths[0];
  var pass = auths[1];
  console.log(`user ${user}`);
  console.log(pass);

  auth
    .authenticate(user, pass)
    .then(async () => {
      const { id } = req.params;
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

      return res.json({ status: true, order });
    })
    .catch((erro) => {
      return res.writeHead(400).end(
        JSON.stringify({
          message: erro,
        })
      );
    });
});

app.delete("/order/:id", async (req, res) => {
  var authheader = req.headers.authorization;
  var auths = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auths[0];
  var pass = auths[1];
  console.log(`user ${user}`);
  console.log(pass);

  auth
    .authenticate(user, pass)
    .then(async () => {
      const { id } = req.params;

      const order = await orderModel.deleteOne({ _id: id });

      return res.json({ status: true, order });
    })
    .catch((erro) => {
      return res.writeHead(400).end(
        JSON.stringify({
          message: erro,
        })
      );
    });
});

mongoose.connect("mongodb://localhost:27017");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
