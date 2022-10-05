const express = require("express");
const orderModel = require("../orderModel");
const authenticate = require("../authenticate")

const orderRoute = express.Router();

orderRoute.post('/', (req, res) => {
  authenticate (req,res)
      .then(async() => {
          const body = req.body.order;

          const total_price = body.items.reduce((prev, curr) => {
              prev += curr.price
              return prev
          }, 0);

          const order = await orderModel.create({ 
              items: body.items,
              created_at: moment().toDate(),
              total_price
          })
          
          return res.json({ status: true, order })
      }).catch((err) => {
          return res.json({ status: false, message: err })
      })
})

orderRoute.get('/:orderId', (req, res) => {
  authenticate(req,res)
      .then(async () => {
          const { orderId } = req.params;
          console.log(orderId);
          const order = await orderModel.findById(orderId)

          if (!order) {
              return res.status(404).json({ status: false, order: null })
          }

          return res.json({ status: true, order })
      }).catch((err) => {
          return res.json({ status: false, message: err })
      })
  })

  orderRoute.patch('/:id', (req, res) => {
  authenticate(req,res)
      .then(async() => {
          const { id } = req.params;
          const { state } = req.body.order;

          const order = await orderModel.findById(id)

          if (!order) {
              return res.status(404).json({ status: false, order: null })
          }

          if (state < order.state) {
              return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
          }

          order.state = state;

          order.save()

          return res.json({ status: true, order })
      }).catch((err) => {
          return res.json({ status: false, message: err })
      })

})

orderRoute.delete('/:id', (req, res) => {
  authenticate(req,res)
      .then(async() => {
          const { id } = req.params;

          const order = await orderModel.deleteOne({ _id: id})

          return res.json({ status: true, order })
      }).catch((err) => {
          return res.json({ status: false, message: err })
      })

})


module.exports = orderRoute;