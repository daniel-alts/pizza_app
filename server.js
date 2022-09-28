require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./index')

const PORT = 3334

mongoose.connect(process.env.MONGO_URI)

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