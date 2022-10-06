const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');

const userModel = require('./models/userModel')
const { success, error } = require("consola");

// Bring in the app constants
const { DB, PORT } = require("./config");


const app = express()

app.use(express.json());

// Router Middleware
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api", require("./routes/orderRoutes"));



app.get('/', (req, res) => {
  return res.json({ status: true })
})




const startApp = async () => {
    try {
      // Connection With DB
      await  mongoose.connect(DB, {dbName: "pizza",
      useNewUrlParser: true,
      useUnifiedTopology: true
      });
  
      success({
        message: `Successfully connected with the Database \n${DB}`,
        badge: true
      });
  
      // Start Listenting for the server on PORT
      app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, badge: true })
      );
    }catch(err){
         error({
        message: `Unable to connect with Database \n${err}`,
        badge: true
      });
    
    }
  };
  
  startApp();


