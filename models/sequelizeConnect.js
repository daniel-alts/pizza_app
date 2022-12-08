const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db_config");
const orderModel = require("./orderModel");
const userModel = require("./userModel");
const catchAsyncError = require("../utils/catchAsyncError");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USERNAME,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
  }
);

// Testing the connection
catchAsyncError(async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log(
        "Connection to the database has been established successfully."
      );
    })
    .catch((err) => {
      console.log("Unable to connect to the database:", err);
    });
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adding our models
db.orders = orderModel(sequelize, DataTypes);
db.users = userModel(sequelize, DataTypes);

// Adding the relations
db.users.hasMany(db.orders, { foreignKey: "user_id" });
db.orders.belongsTo(db.users, { foreignKey: "user_id" });

// Syncing all the models at once
// force: false will not drop the table if it already exists
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables synced");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error syncing the database");
  });

module.exports = db;
