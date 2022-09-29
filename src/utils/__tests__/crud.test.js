const { createOrder, checkOrderById, checkAllOrder, orderState, deleteOrder } = require('../crud')
const Order = require('../../resources/order/order.model')
const mongoose = require('mongoose')
const moment = require('moment')

jest.setTimeout(20000) // resets Jest timeout time allow for execution.

// Creates mondodb connection before testing
beforeAll( async () => {
    try{
        await mongoose.connect('mongodb://0.0.0.0:27017')
        await mongoose.connection.db.dropDatabase()
    }catch {
        console.error('Couldn\'t connect to MongoDB')
    }
   
})

// Drops database after each describe operation
afterEach( async () => {
    try{
        await mongoose.connection.db.dropDatabase()
    } catch {
        console.error('Check connection')
    }
})


describe('createOrder', () => {
    it('create new order', async () => {
        expect.assertions(5)

        const body = {
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

describe('checkAllOrder', () => {
    it('check that all orders were returned', async () => {
        expect.assertions(5)

        await Order.create([
            { items: [{
                name: 'peperoni',
                price: 1500,
                size: 's',
                quantity: 2,
            }]},
            { items:[{
                name: 'peperoni',
                price: 1500,
                size: 's',
                quantity: 3,
            }]},
            { items:[{
                name: 'peperoni',
                price: 1500,
                size: 's',
                quantity: 5,
            }]}
        ])

        const prices = [3000, 4500, 7500]

        const req = {}

        const res = {
            status(status) {
                expect(status).toBe(200)
                return this
            },
            json(results) {
                expect(results.data).toHaveLength(3)
                results.data.forEach( async (result,i) => await expect(`${result.total_price}`).toBe(`${prices[i]}`))
            }
        }

        await checkAllOrder(Order)(req, res)
    })


})


// Drops the database and the closes the connection after all the tests might have ran
afterAll(async () => {
    try{
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    } catch {
        console.error('Failed to drop database')
    }
    
});