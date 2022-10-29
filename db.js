// *********************** DATABASE CONNECTION *****************//

const mongoose = require('mongoose');

function dbConnect(){
    mongoose.connect('mongodb://localhost:27017/pizzaApp')
};

dbConnect();

module.exports = dbConnect