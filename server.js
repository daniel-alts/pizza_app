const express = require("express")


const orderRoute = require('./routes/order.route')
const userRoute = require('./routes/user.route')

function createServer() {
	const app = express()
	app.use(express.json())
  app.get('/', (req, res) => {
    return res.json({ status: true })
})
	app.use("/user", userRoute)
	app.use("/orders", orderRoute)
	return app
}

module.exports = createServer