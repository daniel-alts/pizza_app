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
            json(results) {
                expect(results.data._id).toBeDefined()
                expect(results.data.state).toBe(1)
                expect(results.data.created_at).toBeDefined() 
                expect(typeof results.data.items).toBe(typeof body.items)
            }
        }

        await createOrder(Order)(req, res)

    })


    it('total_price was updated', async () => {
        expect.assertions(3)

        const body = {
            id: mongoose.Schema.ObjectId,
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
            json(results) {
                expect(results.data.total_price).toBeDefined()
                expect(results.data.total_price).toBe(3000)
            }
        }

        await createOrder(Order)(req, res)
    })
})

// Drops the database and the closes the connection after all the tests might have ran
afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
});