const express = require("express");
const db = require('./db/connectdb')

const userRoute = require('./Routes/userRoute');
const orderRoute = require('./Routes/orderRoutes');



db.connectToDb()

const PORT = 3334;

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
    try{
    return res.status(200).send({message:"welcome to Kaounta pizza"})
    
    }
    catch(err){
      return res.status(404).send({message:`sorry for the inconveniences,${err}`})
    }
    })

app.use('/user',userRoute)

app.use('/order',orderRoute)





app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
  });
  
  