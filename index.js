const http = require('http');
const express = require('express');
const ORDERROUTES = require('./routes/orderRoutes');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('common'));

app.use('/api/orders', ORDERROUTES);

// app.use();
module.exports = { app, http };
