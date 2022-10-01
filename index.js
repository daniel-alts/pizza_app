const express = require('express');
const mongoose = require('mongoose');

//importing routers
const orderRouter = require('./routes/orders')
const userRouter = require('./routes/users')

//import authentication middleware
const authentication = require('./middleware/authentication')

const PORT = 3334

const app = express()

app.use(express.json());




// using the routers
app.use('/register',userRouter)
app.use('/orders' ,authentication ,orderRouter)


app.get('/', (req, res) => {
    return res.json({ status: true })
})


app.all('*',(req,res)=>{
    return res.status(404).json({ status: false, msg: "page not Found" })

})

mongoose.connect('mongodb://localhost:27017')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})


module.exports = app