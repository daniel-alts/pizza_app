const express = require('express');
const { config } = require('dotenv');
const { connectMongoDB } = require('./model/db_settings/connection');
const { router: orderRouter } = require('./controller/router/orderRouter');
const { router: signupRouter } = require('./controller/router/signupRouter');
// const { router: loginRouter } = require('./controller/router/loginRouter');

const app = express();
const PORT = process.env.PORT || 3334;

// dotenv config
config();

// MongoDB connection
connectMongoDB();

// Middlewares
app.use(express.json());
app.use('/order', orderRouter);
app.use('/signup', signupRouter);
// app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(
    `This Pizza app is "OBI-diently" and "YUSUF-fully" listening for requests at http://127.0.0.1:${PORT}`
  );
});
