const { createOrder, checkOrderById, checkAllOrder, orderState, deleteOrder } = require('../crud')
const Order = require('../../resources/order/order.model')
const mongoose = require('mongoose')
const moment = require('moment')

jest.setTimeout(20000) // resets Jest timeout time allow for execution.

// Creates mondodb connection before testing
beforeAll( async () => {
    await mongoose.connect('mongodb://0.0.0.0:27017')
})

describe('createOrder', () => {
    it('create new order', async () => {
        expect.assertions(5)

        const body = {
            created_at: moment().toDate(),
            items:[{
                name: 'peperoni',
                price: 1500,
                size: 's',
                quantity: 2,
            }]
        }

        const req = {
            body
        }

        const res = {
            status(status) {
                expect(status).toBe(201)
                return this
            },
            json(result) {
                expect(result.data._id).toBeDefined()
                expect(result.data.state).toBe(1)
                expect(result.data.created_at).toBeDefined() 
                expect(typeof result.data.items).toBe(typeof body.items)
            }
        }

        await createOrder(Order)(req, res)

    })


    it('total_price was updated', async () => {
        expect.assertions(3)

        const body = {
            created_at: moment().toDate(),
            items:[{
                name: 'peperoni',
                price: 1500,
                size: 's',
                quantity: 2,
            }]
        }

        const req = {
            body
        }

        const res = {
            status(status) {
                expect(status).toBe(201)
                return this
            },
            json(result) {
                expect(result.data.total_price).toBeDefined()
                expect(result.data.total_price).toBe(3000)
            }
        }

        await createOrder(Order)(req, res)
    })
})

describe('checkOrderById', () => {
    it('check the order by ID', async () => {
        expect.assertions(2)
        const order = await Order.create({
            items:[{
                name: 'peperoni',
                price: 1500,
                size: 's',
                quantity: 2,
            }]
        })
        const req = {
            params:{
                orderId: order._id
            }
        }

        const res = {
            status(status) {
                expect(status).toBe(200)
                return this
            },
            json(result) {
                expect(result.data._id.toString()).toBe(order._id.toString())
            }
        }

        await checkOrderById(Order)(req, res)

    })
})

// Drops the database and the closes the connection after all the tests might have ran
afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
});