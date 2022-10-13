const express = require("express")

const Order = require("../models/order")
const orderRouter = express.Router()

// Create new order
orderRouter.post('/', async (req, res) => {
    const orderData = req.body.order;

    try {
        const order = await Order.create({ 
            items: orderData.items,
        })

        order.total_price = order.items.reduce((prev, curr) => {
            prev += curr.price * curr.quantity
            return prev
        }, 0);
        
        await order.save()
        return res.json({ status: true, order })
    } catch (err) {
        return res.status(400).send(err)
    }
})

// Get order by id
orderRouter.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

// Get all orders
orderRouter.get('/', async (req, res) => {
    const ORDER_PER_PAGE = 10
    const queryParams = req.query

    // Handle the query parameters
    let 
        sort = queryParams.sort,     // Sort by date or price; ascending or descending
        state = +queryParams.state,  // Filter by state (1: pending, 2: preparing, 3: pickup, 4: delivered)
        page = +queryParams.page     // Get current pagination

    const sortQuery = {}
    const filterQuery = {}

    if (sort) {
        // Handle sorts
        sort.includes("date|asc") ? sortQuery["created_at"] = 1 : null
        sort.includes("date|desc") ? sortQuery["created_at"] = -1 : null
        sort.includes("price|asc") ? sortQuery["total_price"] = 1 : null
        sort.includes("price|desc") ? sortQuery["total_price"] = -1 : null
        
    }

    // Handle filter by state 
    if ([1, 2, 3, 4].includes(state)) filterQuery.state = state

    const orders = await Order.find(filterQuery).sort(sortQuery)
    const ordersLength = orders.length

    const start = ORDER_PER_PAGE * page
    const end = ORDER_PER_PAGE * (page + 1)
    const shortened_orders = orders.slice(start, end)

    if (shortened_orders.length !== 0) {
        const url = new URL("http://localhost:3334/order" + req.url)
        
        const context = {
            pageNum: page + 1,
            orders: shortened_orders,
            start: start,
            end: (end < ordersLength) ? end : ordersLength,
            totalNum: ordersLength,
            finished: false
        }
        url.searchParams.set("page", page - 1)
        context.prevUrl = url.search
        url.searchParams.set("page", page + 1)
        context.nextUrl = url.search

        return res.render("orders", context)
    } else {
        return res.render("orders", {
            finished: true 
        })
    }

    // return res.json({ status: true, orders })
})

// Update order of specific id
orderRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body.order;

    const order = await Order.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
})

// Delete order
orderRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await Order.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


module.exports = orderRouter