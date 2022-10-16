const express = require("express");
const db = require('./db/connectdb')
const bodyParser= require('body-parser')
const userRoute = require('./Routes/userRoute');
const orderRoute = require('./Routes/orderRoutes');
const passport = require('passport')
db.connectToDb()
require('dotenv').config()
require('./basicAuthentication')

const PORT = 3334;

const app = express();

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req, res) => {
    try{
    return res.status(200).send({message:"welcome to Kaounta pizza"})
    
    }
    catch(err){
      return res.status(404).send({message:`sorry for the inconveniences,${err}`})
    }
    })

app.use('/',userRoute)

app.use('/order',passport.authenticate('jwt',{session:false}),orderRoute)



app.use((err, req, res,next)=>{
  console.log(err)
  res.status(err.status||500)
})

app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
  });
  
  