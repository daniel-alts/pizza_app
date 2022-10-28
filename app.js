require('dotenv').config();
const app = require('./index')

//db
const connectDB  = require('./db/connect');

//.env
const PORT = process.env.PORT || 3335;
const MONGO_DB_URI = process.env.MONGO_DB_URI

//server & database connection
const start = async() =>{
    try {
        //connect to DB
       await connectDB(MONGO_DB_URI)
    //    console.log("Connected to MongoDB Successfully");
    
    //connect to server
     app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

    } catch (error) {
        console.log(`Unable to initial connection: Error info: ${error}`)
    }
}

start()