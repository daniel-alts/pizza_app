/* eslint-disable no-undef */
const dotenv = require("dotenv");

dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    APP_NAME: process.env.APP_NAME,
    API_KEY: process.env.API_KEY,
};


module.exports = config;