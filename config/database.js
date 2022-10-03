/* eslint-disable no-undef */
const mongoose = require("mongoose");
const config = require("./index");

const connect = async () => {
    const connection = await mongoose.connect(config.MONGO_URL);
    if (!connection) {
        console.log("DATABASE connection failed! Exiting Now");
        process.emit("SIGTERM");
        process.exit(1);
    }
    console.log("DATABASE connected successfully!!!");
    return connection;
};

module.exports = { connect };