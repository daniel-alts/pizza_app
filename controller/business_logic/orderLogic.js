const moment = require('moment');
const { Order } = require('../../model/Models/orderModel');
const { User } = require('../../model/Models/userModel');

// AUTHENTICATE
/* async function loginHandler(req, res, next) {
  // check that client entered a username and password.
  // check that client already has a user account.
  // check that the entered password matches what is stored in the database.


} */

// POST LOGIC
async function postLogic(req, res) {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await Order.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, order });
}

// GET-BY-ID LOGIC
async function getByIdLogic(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
}

// GET-ALL LOGIC
async function getAllLogic(req, res) {
  /* const { username: usrn, password: pwd } = req.headers;
  res.send(usrn);
  console.log(pwd); */

  /* async function loginHandler(req, res, next) {
  // check that client entered a username and password.
  // check that client already has a user account.
  // check that the entered password matches what is stored in the database. */

  const { username, password: requestPwd } = req.headers;
  if (!username || !requestPwd) {
    return res
      .status(400)
      .send('Haba now! Your username and password is required jor!');
  }

  const validUserArr = await User.find({ username: username });
  const [validUserObj] = validUserArr;

  if (!validUserObj) {
    console.log(
      `Sorry, you don't have an account with us. But you can sign up "here".`
    );
    return res
      .status(401)
      .send(
        `Sorry, you don't have an account with us. But you can sign up "here".`
      );
  }

  const { password: savedPwd } = await validUserObj;

  if (savedPwd !== requestPwd) {
    console.log([401, `Unathorized`]);
    return res
      .status(401)
      .send(
        `Na wa for you O! So you wan dey guess another person password? Abi, you forget your own ni?`
      );
  }

  const orders = await Order.find();
  console.log({ status: true, orders });

  return res.status(200).json({ status: true, orders });
}

// PATCH LOGIC
async function patchLogic(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: 'Invalid operation' });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
}

// DELETE LOGIC
async function deleteLogic(req, res) {
  const { id } = req.params;

  const order = await Order.deleteOne({ _id: id });

  return res.json({ status: true, order });
}

module.exports = {
  postLogic,
  getByIdLogic,
  getAllLogic,
  patchLogic,
  deleteLogic,
};
