const { app } = require('./index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const server = require('./serverRoom');
const server2 = require('./app');

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Mongo Connected'))
	.catch((err) => console.log(err));

// console.log(app);
// const port = process.env.PORT || 9000;

const newServer = new server(server2, 5555);
const Gat = new server(app, 9000);
Gat.listen();
newServer.listen();
