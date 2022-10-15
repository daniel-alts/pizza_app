const { createServer } = require('http');
const { app } = require('./index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Create server class
class server extends createServer {
	constructor(app, port) {
		super();
		this.port = port;
		this.app = app;

		createServer(this.app).listen(this.port, () => {
			console.log(`Node is listening on ${this.port}`);
		});
	}
}

// Connect DB

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Mongo Connected'))
	.catch((err) => console.log(err));

server = new server(app, 9000);
server.listen();
