const express = require("express");
const moment = require("moment");
const orderModel = require("../models/orderModel");
const { authenticateUser } = require("../authenticate");

const orderRoute = express.Router();

orderRoute.post("/", (req, res) => {
	authenticateUser(req, res, ["admin"])
		.then(async (user) => {
			try {
        // console.log(`FROM ORDER: ${(user)}`);
				// if (res.status >= 400) {
				// 	return res;
				// }

				const body = req.body;

				const total_price = body.items.reduce((prev, curr) => {
					prev += curr.price;
					return prev;
				}, 0);

				// const order = await orderModel.create({
				// 	items: body.items,
				// 	created_at: moment().toDate(),
				// 	total_price,
				// });

				return res.status(201).json({
					message: "Order created successfully",
					// data: order,
				});
			} catch (error) {
				console.log(`The first error is: ${error}`);
				return res
					.status(500)
					.json({
						status: false,
						message: `The first error is: ${error.message}`,
					});
			}
		})
		.catch((error) => {
			console.log(`The second error is: ${error.message}`);
			// return res.status(500).json({ status: false, message: `The second error is: ${error.message}` });
		});
});

orderRoute.get("/:orderId", async (req, res) => {
	const { orderId } = req.params;
	const order = await orderModel.findById(orderId);

	if (!order) {
		return res.status(404).json({ status: false, order: null });
	}

	return res.json({ status: true, order });
});

orderRoute.get("/", async (req, res) => {
	const orders = await orderModel.find();

	return res.json({ status: true, orders });
});

orderRoute.patch("/:id", async (req, res) => {
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
});

orderRoute.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const order = await orderModel.deleteOne({ _id: id });

	return res.json({ status: true, order });
});

module.exports = { orderRoute };
