const { app, http } = require('./index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Mongo Connected'))
	.catch((err) => console.log(err));
// console.log(app);
const port = process.env.PORT || 9000;

http.createServer(app).listen(port, () => {
	console.log(`Node   ${port}`);
});
