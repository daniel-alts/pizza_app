// import router from express
const { Router } = require("express");
// import order model
const Order = require("../models/orderModel");
// import isLoggedIn custom middleware
const { isLoggedIn } = require("./middleware");
const { user_type } = require("./roles")

const router = Router();

//custom middleware could also be set at the router level like so
// router.use(isLoggedIn) then all routes in this router would be protected
router.use(isLoggedIn);

// index route with isLoggedIn middleware
router.get("/", isLoggedIn, async (req, res) => {
    // get username from req.user property created by isLoggedIn middleware
    const { username } = req.user;
    //send all orders to that user
    res.json(
        await Order.find({username}).catch((error) =>
        res.status(400).json({error})
        )
    );
});

// show Route with isLoggedIn middleware
router.get("/:id", isLoggedIn, async (req,res) => {
    // get username from req.user property cfreated by isLoggedIn middleware
    const { username} = req.user;
    // get id from Params
    const _id = req.params.id;
    // send target order
    res.json (
        await Order.findOne({username, _id}).catch((error) => 
        res.status(400).json({error})
    )
    );
});

// create Route with isLoggedIn middleware
router.post("/", isLoggedIn, async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    req.body.username = username; // add username property to req.body
    //create new order and send it in response
    res.json(
      await Order.create(req.body).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });
  
  // update Route with isLoggedIn middleware
  router.put("/:id", isLoggedIn, user_type, async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    req.body.username = username; // add username property to req.body
    const _id = req.params.id;
    //update order with same id if belongs to logged in User
    res.json(
      await Order.updateOne({ username, _id }, req.body, { new: true }).catch(
        (error) => res.status(400).json({ error })
      )
    );
  });
  
  // update Route with isLoggedIn middleware
  router.delete("/:id", isLoggedIn, user_type, async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    const _id = req.params.id;
    //remove order with same id if belongs to logged in User
    res.json(
      await Order.remove({ username, _id }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });
  
  module.exports = router
