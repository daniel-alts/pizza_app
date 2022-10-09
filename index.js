const express = require('express');
const { config } = require('dotenv');
const { connectMongoDB } = require('./model/db_settings/connection');
const { router: orderRouter } = require('./controller/router/orderRouter');

const app = express();
const PORT = process.env.PORT || 3334;

// dotenv config
config();

// MongoDB connection
connectMongoDB();

// Middlewares
app.use(express.json());
app.use('/order', orderRouter);

app.listen(PORT, () => {
  console.log(
    `This Pizza app is "OBI-diently" and "YUSUF-fully" listening for requests at http://127.0.0.1:${PORT}`
  );
});
