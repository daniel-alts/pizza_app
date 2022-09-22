const http = require('http');
const express = require('express');
const moment = require('moment');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('common'));

console.log('object');

module.exports = { app, http };
