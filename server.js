const app = require("./app");
const { connectToMongoDB } = require("./utils/db.utils");
const { logger } = require("./loggers");

const PORT = process.env.PORT || 3000;

// Connecting to MongoDB instance
connectToMongoDB();

app.listen(PORT, () => {
	logger.info("Listening on port, ", PORT);
});
