const express = require("express");
const orderModel = require("../model/orderModel");
const authenticateUser = require("../authenticate")
const authenticateUser1 = require("../authenticate1")


const orderRoute = express.Router();


// get orders
orderRoute.get("/", (req, res) => {
     orderModel.find()
       .then((orders) => {
         return res.status(200).send(orders);
       })
       .catch((err) => {
         console.log(err);
         res.status(500).send(err.message);
       });
})

// get orders in ascending order of total price
orderRoute.get("/:price", authenticateUser, (req, res) => {
  const {limit, page} = req.query
  const skip = (page - 1) * limit
  orderModel.find().sort({ total_price: -1 }).limit(limit).skip(skip)
    .then((orders) => {
      return res.status(200).send(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});


// get orders in ascending order of date created
orderRoute.get("/:date", authenticateUser, (req, res) => {
   const { limit, page } = req.query;
   const skip = (page - 1) * limit;
  orderModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip)
    .then((orders) => {
      return res.status(200).send(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

// get orders in order of state
orderRoute.get("/:state", authenticateUser, (req, res) => {
   const { limit, page } = req.query;
   const skip = (page - 1) * limit;
  orderModel.find().sort({ state: -1 }).limit(limit).skip(skip)
    .then((orders) => {
      return res.status(200).send(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

orderRoute.get("/:id", authenticateUser1, (req, res) => {
    const id = req.params.id
    console.log(id)
     orderModel.findById(id)
    .then((order) => {
        if (!order) {
          return res.status(404).json({ status: false, order: null });
        }
      res.status(200).send(order);
    }).catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "order id not found"
      });
    });
});

//create order
// orderRoute.post('/', async (req, res) => {
//     const body = req.body;

//     const total_price = body.items.reduce((prev, curr) => {
//         prev += curr.price
//         return prev
//     }, 0);

//     const order = await orderModel.create({ 
//         items: body.items,
//         total_price
//     })
    
//     return res.json({ status: true, order })
// })
orderRoute.post("/", (req, res) => {
  const order = req.body;
  console.log(order);

  const total_price = order.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  orderModel.create({
      items: order.items,
      total_price,
    })
    .then((order) => {
      res.status(201).send({
        message: "order created successfully",
        data: order,
        total_price,
      });
    }).catch((err) => {
      res.status(404).send(err);
    });
});

//update user status
// orderRoute.patch('/:id', async (req, res) => {
//     const { id } = req.params;
//     const new_state = req.body
//     console.log(new_state.state)

//     const order = await orderModel.findById(id)
//     console.log(order.state)

//     if (!order) {
//         return res.status(404).json({ status: false, order: null })
//     }

//     if (new_state.state < order.state) {
//         return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
//     }

//     order.state = new_state.state;

//     state = order.state

//     await order.save()

//     return res.json({ status: true, state, order })
// })
orderRoute.patch("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    const newstatus = req.body
    console.log("updating state with id" + id)
    orderModel.findById(id)
    .then((order) => {
        
        if (newstatus.state < order.state) {
          return res.status(422).json({ status: false, order: null, message: "Invalid operation" });
        }
        order.state = newstatus.state;

        state = order.state;

        order.save();
        res.status(200).send(order);

        // return res.json({ status: true, state, order });
    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)
    
    })
    
});

//delete user by id
orderRoute.delete("/:id", authenticateUser, (req, res) => {
    const id = req.params.id
    orderModel.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({
            message: "deletion successful",
            data: ""
        });
      }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
    console.log("deleting order with id" + id)
});





module.exports = orderRoute