const { Sequelize, DataTypes } = require("sequelize");

const Order = (sequelize) => {
  const order = sequelize.define(
    "Order",
    {
      // Model attributes
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      state: {
        type: Sequelize.ENUM,
        values: ["pending", "confirmed", "delivered", "cancelled"],
        defaultValue: "pending",
      },
      total_cost: DataTypes.INTEGER,
      items: DataTypes.JSON,
    },
    { tableName: "orders" }
  );
  return order;
};

module.exports = Order;
