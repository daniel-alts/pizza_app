require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./db");
const moment = require("moment");
const mongoose = require("mongoose");
const OrderModel = require("./model/orderModel");
const UserModel = require("./model/userModel");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const errorHandler = require("./middlewares/errHandler");

const app = express();

/*Connect to Server*/
const PORT = process.env.PORT;

/*Connect to Database*/
connectToMongoDB();

app.use(express.json());

app.use("api/orders", orderRoute);
app.use("api/users", userRoute);

app.all("/", (req, res) => {
    return res.json({ status: true });
});
app.use(errorHandler);

// app.get("/", (req, res) => {
//     return res.json({ status: true });
// });

// app.post("/order", async(req, res) => {
//     const body = req.body;

//     const total_price = body.items.reduce((prev, curr) => {
//         prev += curr.price;
//         return prev;
//     }, 0);

//     const order = await orderModel.create({
//         items: body.items,
//         created_at: moment().toDate(),
//         total_price,
//     });

//     return res.json({ status: true, order });
//     // return res.json({ status: true, body });
// });

// app.get("/order/:orderId", async(req, res) => {
//     const { orderId } = req.params;
//     const order = await orderModel.findById(orderId);

//     if (!order) {
//         return res.status(404).json({ status: false, order: null });
//     }

//     return res.json({ status: true, order });
// });

// app.get("/orders", async(req, res) => {
//     const orders = await orderModel.find();

//     return res.json({ status: true, orders });
// });

// app.patch("/order/:id", async(req, res) => {
//     const { id } = req.params;
//     const { state } = req.body;

//     const order = await orderModel.findById(id);

//     if (!order) {
//         return res.status(404).json({ status: false, order: null });
//     }

//     if (state < order.state) {
//         return res
//             .status(422)
//             .json({ status: false, order: null, message: "Invalid operation" });
//     }

//     order.state = state;

//     await order.save();

//     return res.json({ status: true, order });
// });

// app.delete("/order/:id", async(req, res) => {
//     const { id } = req.params;

//     const order = await orderModel.deleteOne({ _id: id });

//     return res.json({ status: true, order });
// });

// if (process.env.node.env === "producion") {
//     // mongoose.sync();
// } else {
//     mongoose.sync({ force: true }).then(async() => {
//         for (let i = 1; i <= 5; i++) {
//             const user = {
//                 username: `user${i}`,
//                 email: `user${i}@gmail.com`,
//                 password: "P4ssword",
//             };
//             await UserModel.create(user);
//         }
//     });
// }

app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
});