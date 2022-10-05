const User = require("../resources/user/user.model")
const createOrder =
	(model) => async (req, res) => {
		const authenticatedUser =
			req.authenticatedUser
		if (!authenticatedUser) {
			return res
				.status(403)
				.send({ message: 'forbidden' })
		}
		const body = req.body

		try {
			const order = await model.create({
				items: body.items,
			})
			return res
				.status(201)
				.json({ data: order })
		} catch (err) {
            console.log(err)
			res.status(500).json({
				error: 'Error creating order',
			})
		}
	}

const checkOrderById =
	(model) => async (req, res) => {
		const authenticatedUser =
			req.authenticatedUser
		if (!authenticatedUser) {
			return res
				.status(403)
				.send({ message: 'forbidden' })
		}
		const { id } = req.params
		const order = await model.findById(id)

		if (!order) {
			return res.status(404).json({
				status: false,
				order: null,
			})
		}

		return res
			.status(200)
			.json({ data: order })
	}

const checkAllOrder =
	(model) => async (req, res) => {
		try {
			const authenticatedUser =
				req.authenticatedUser
			if (!authenticatedUser) {
				return res
					.status(403)
					.send({ message: 'forbidden' })
			}
            
            let orders 

			const { price, date } = req.query

            //sort by price or date
            if (price) {
                const value = price === 'asc' ? 1 : price === 'desc' ? -1 : false
                if (value)  {
                    orders = await model.find({}).sort({ total_price: value })
                    return res.status(200).json({ data: orders })
                }
              } else if (date) {
                const value = date === 'asc' ? 1 : date === 'desc' ? -1 : false
                
                if (value)  {
                    orders = await model.find({}).sort({ created_at: value })
                    return res.status(200).json({ data: orders })
            }
              }

            // console.log('line 65 ->', price)
			// if (price || date) {
            //     console.log('line 67 ->', price)
            //     try{
            //         orders = model.find({}).sortOrder(price || date)
            //         return res.status(200).json({ data: orders })
            //     } catch (err) {
            //         console.log(err)
            //     }
                
                
				// return res.status(200).json({ data: newOrder })
			// }
            // if (!orders){
            //     return res
			// 	.status(200)
			// 	.json({ data: orders })
            // }
		
		} catch (err) {
			return res.status(404)
		}
	}

const orderState =
	(model) => async (req, res) => {
		const authenticatedUser =
			req.authenticatedUser
		if (!authenticatedUser) {
			return res
				.status(403)
				.send({ message: 'forbidden' })
		}
		const { id } = req.params
		const { state } = req.body

		const order = await model.findById(id)

		if (!order) {
			return res.status(404).json({
				status: false,
				order: null,
			})
		}

		if (state < order.state) {
			return res.status(422).json({
				status: false,
				order: null,
				message: 'Invalid operation',
			})
		}

		order.state = state

		await order.save()

		return res
			.status(200)
			.json({ data: order })
	}

const deleteOrder =
	(model) => async (req, res) => {
		const authenticatedUser =
			req.authenticatedUser
		if (!authenticatedUser) {
			return res
				.status(403)
				.send({ message: 'forbidden' })
		}

		if (
			authenticatedUser.role !== 'admin'
		) {
			return res
				.status(401)
				.send({ message: 'Unauthorised' })
		}

		const { id } = req.params

		const order = await model.deleteOne({
			_id: id,
		})

		return res
			.status(204)
			.json({ data: order })
	}

const crudControllers = (model) => ({
	createOrder: createOrder(model),
	checkOrderById: checkOrderById(model),
	checkAllOrder: checkAllOrder(model),
	orderState: orderState(model),
	deleteOrder: deleteOrder(model),
})

module.exports = {
	createOrder,
	checkOrderById,
	checkAllOrder,
	orderState,
	deleteOrder,
	crudControllers,
}
