const { Router } = require('express');
const moment = require('moment');

const orderModel = require('../model/orderModel');

const { pagination } = require('../middlewares/middlewares');

function orderRoutes() {
  const orderRoutes = Router();
  orderRoutes
    .route('/')
    .get(pagination, (req, res) => {
      const { order } = req;

      if (req.query.sort_by && req.query.order === 'desc') {
        order.orders = order.orders.sort(
          (a, b) => b.total_price - a.total_price
        );
      }

      if (
        req.query.sort_by &&
        (req.query.order === 'asc' || req.query.order === undefined)
      ) {
        order.orders = order.orders.sort(
          (a, b) => a.total_price - b.total_price
        );
      }

      if (req.query.created_at && req.query.order === 'desc') {
        order.orders = order.orders.sort((a, b) => b.created_at - a.created_at);
      }
      if (
        req.query.created_at &&
        (req.query.order === 'asc' || req.query.order === undefined)
      ) {
        order.orders = order.orders.sort((a, b) => a.created_at - b.created_at);
      }

      return res.status(200).json({ status: true, order });
    })
    .post((req, res) => {
      (async function newOrder() {
        try {
          const body = req.body;

          const total_price = body.items.reduce((prev, curr) => {
            prev += curr.price * +curr.quantity;
            return prev;
          }, 0);

          const order = await orderModel.create({
            state: +body.state,
            items: body.items,
            created_at: moment().toDate(),
            total_price,
          });

          return res.status(201).json({ status: true, order });
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    });
  orderRoutes
    .route('/:orderId')
    .get((req, res) => {
      (async function getOrder() {
        try {
          const { orderId } = req.params;
          const order = await orderModel.findById(orderId);

          if (!order) {
            return res.status(404).json({ status: false, order: null });
          }

          return res.status(200).json({ status: true, order });
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    })
    .patch((req, res) => {
      (async function updateOrder() {
        try {
          const { orderId } = req.params;
          const { state } = req.body;

          const order = await orderModel.findById(orderId);

          if (!order) {
            return res.status(404).json({ status: false, order: null });
          }

          if (+state < order.state) {
            return res.status(422).json({
              status: false,
              order: null,
              message: 'Invalid operation',
            });
          }
          order.state = state;
          await order.save();

          return res.status(204).json({ status: true, order });
        } catch (err) {
   
          return res.status(500).json(err);
        }
      })();
    })
    .delete(async (req, res) => {
      (async function deleteOrder() {
        try {
          const { id } = req.params;
          const order = await orderModel.deleteOne({ _id: id });
          return res.status(200).json({ status: true, order });
        } catch (err) {
          return res.status(500).json(err);
        }
      })();
    });

  return orderRoutes;
}

module.exports = orderRoutes;
