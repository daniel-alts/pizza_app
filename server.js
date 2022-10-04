const app = require("./app");
const { connectToMongoDB } = require("./utils/db.utils");


const PORT = process.env.PORT || 3000;

// Connecting to MongoDB instance
connectToMongoDB();

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});
