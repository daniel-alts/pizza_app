const { crudControllers } = require("../../utils/crud")
const Order = require("./order.model")

module.exports = crudControllers(Order)
