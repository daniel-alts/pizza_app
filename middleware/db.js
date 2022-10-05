const mongoose = require ('mongoose');


module.exports = () =>{
    mongoose
    .connect(process.env.URL)
    .then(() =>{
        console.log(`connection to MongoDB successful`)
    })
    .catch((err)=>{
        console.log(`connection  to MongoDB failed`, err.message)
    })
}