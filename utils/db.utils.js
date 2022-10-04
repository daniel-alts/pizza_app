require("dotenv").config();
const mongoose = require("mongoose");

let dbURL = process.env.MONGODB_CONNECTION_URL;
// let mongod = null;

function connectToMongoDB() {
  // if (process.env.NODE_ENV === "test") {
  //   mongod = await MongoMemoryServer.create();
  //   dbURL = mongod.getUri();
  // }

	mongoose.connect(dbURL);

	mongoose.connection.on("connected", () => {
		console.log("MongoDB connected successfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("An error occurred while connecting to MongoDB");
		console.log(err);
	});
}

module.exports = {
	connectToMongoDB,
	disconnect: () => {
    mongoose.connection.close();
  }
};
