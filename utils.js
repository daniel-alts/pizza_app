const orderModel = require("./models/orderModel");

function getAllOrdersCount() {
  const order = orderModel.length;
  return order;
}

function getOrdersName() {
  const order = orderModel.map((order) => order.name);
  return order;
}
// function getOrdersName(orderModel) {
//   return orderModel.map((order) => order.items.name);
// }

// function getTheHighestPrice(orderModel) {
//   const orderPrice = orderModel.map((order) => order.total_price);
//   console.log(orderPrice);
//   return Math.max(...orderPrice);
// }

// function orderIsInDB(id, orderModel) {
//   const order = orderModel.some((order) => order._id == id);
//   if (order) {
//     return true;
//   } else {
//     throw new Error(`order with the id ${id} not found`);
//   }
// }

module.exports = {
  getAllOrdersCount,
  // getOrdersName,
  // getTheHighestPrice,
  // orderIsInDB,
};
