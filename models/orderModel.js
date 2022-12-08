const { sequelize, DataTypes } = require("sequelize");

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
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      total_cost: DataTypes.INTEGER,
      items: DataTypes.JSON,
    },
    { tableName: "orders" }
  );
  return order;
};

module.exports = Order;
