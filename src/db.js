const mongoose = require('mongoose');
require("dotenv").config();


const DATABASE_URI = process.env.DATABASE_URI



class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(DATABASE_URI).
        then(() => {
            console.log('Connected to dabase successfully.');
        }).
        catch(error => {
            console.error('Database connection failure.');
        })
    }
}



module.exports = new Database();


