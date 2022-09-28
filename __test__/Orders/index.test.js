/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../index')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const userModel = require('../../Users/model')
const orderModel = require('../../Orders/orderModel')

let mongoServer

beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    mongoServer.stop()
})

const orderId = '633460c871320a2e0d39802c'

const dummyUser = {
    username: 'john',
    password: 'secret',
    user_type: 'admin'
}
const dummyOrder = {
    _id: orderId,
    created_at: Date.now(),
    state: 1,
    total_price: 1000,
    items: [{
        name: 'Bread',
        price: 1000,
        size: 'm',
        quantity: 2,
    }]
}


describe('Orders', () => {
    describe('Validation', () => {
        describe('Given the user is not validated', ()=>{
            test('Should return 401-statusCode and with an error message', async () => {    
                const response = await request(app)
                .get('/')
                
                expect(response.statusCode).toBe(401)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({})
            })
        })
    })

    describe('Get Route', () => {
        describe('Given the user is validated', ()=>{
            test('Should return 200-statusCode and a success message', async () => {
                await new userModel({ ...dummyUser }).save()
    
                const response = await request(app)
                .get('/')
                .auth('john', 'secret')
    
                expect(response.statusCode).toBe(200)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: true
                })
                expect(response.body).not.toEqual({})
            })
        })
    })

    describe('Post Route', () => {
        describe('Given the user is validated', ()=>{
            test('Should return 200-statusCode and a order-body', async () => {
                await new userModel({ ...dummyUser }).save()

                const response = await request(app)
                .post('/order')
                .auth('john', 'secret')
                .send({ items: [{name: 'Bread', price: 1000, size: 'm', quantity: 2 }]})
    
                expect(response.statusCode).toBe(200)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: true,
                    order: expect.any(Object)
                })
                expect(response.body).not.toEqual({})
            })
        })
    })

    describe('Get Order Route', () => {
        describe('Given the user is validated', ()=>{
            test('Order Exists: Should return 200-statusCode and an order-body', async () => {
                await new userModel({ ...dummyUser }).save()
                await new orderModel({ ...dummyOrder }).save()

                const response = await request(app)
                .get(`/order/${orderId}`)
                .auth('john', 'secret')
    
                expect(response.statusCode).toBe(200)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: true,
                    order: expect.any(Object)
                })
                expect(response.body).not.toEqual({})
            })

            test('Order Does Not Exist: Should return 404-statusCode and status: false', async () => {
                await new userModel({ ...dummyUser }).save()

                const response = await request(app)
                .get(`/order/${orderId}`)
                .auth('john', 'secret')
    
                expect(response.statusCode).toBe(404)
                expect(response.statusCode).not.toBe(200)
                expect(response.body).toEqual({
                    status: false,
                    order: null
                })
                expect(response.body).not.toEqual({})
            })
        })
    })

    describe('Get Orders Route', () => {
        describe('Given the user is validated', ()=>{
            test('Should return 200-statusCode and an array of orders', async () => {
                await new userModel({ ...dummyUser }).save()
                await new orderModel({ ...dummyOrder }).save()

                const response = await request(app)
                .get('/orders')
                .auth('john', 'secret')
                .query({ sort: 'date,total_price', state: 1})
    
                expect(response.statusCode).toBe(200)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: true,
                    orders: expect.any(Array)
                })
                expect(response.body).not.toEqual({})
            })
        })
    })

    describe('Update Order Route', () => {
        describe('Given the user is validated', ()=>{
            test('Order Exists and state > order.state : Should return 200-statusCode and an order-body', async () => {
                await new userModel({ ...dummyUser }).save()
                await new orderModel({ ...dummyOrder }).save()

                const response = await request(app)
                .patch(`/order/${orderId}`)
                .auth('john', 'secret')
                .send({ state: 3})
    
                expect(response.statusCode).toBe(200)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: true,
                    order: expect.any(Object)
                })
                expect(response.body).not.toEqual({})
            })

            test('Order Exists and state < order.state : Should return 422-statusCode and an error message', async () => {
                await new userModel({ ...dummyUser }).save()
                await new orderModel({ ...dummyOrder }).save()

                const response = await request(app)
                .patch(`/order/${orderId}`)
                .auth('john', 'secret')
                .send({ state: 0})
    
                expect(response.statusCode).toBe(422)
                expect(response.statusCode).not.toBe(200)
                expect(response.body).toEqual({
                    status: false,
                    order: null,
                    message: 'Invalid operation'
                })
                expect(response.body).not.toEqual({})
            })

            test('Order Does Not Exist: Should return 404-statusCode', async () => {
                await new userModel({ ...dummyUser }).save()

                const response = await request(app)
                .patch(`/order/${orderId}`)
                .auth('john', 'secret')
                .send({ state: 0})
    
                expect(response.statusCode).toBe(404)
                expect(response.statusCode).not.toBe(200)
                expect(response.body).toEqual({
                    status: false,
                    order: null
                })
                expect(response.body).not.toEqual({})
            })
        })
    })

    describe('Delete Order Route', () => {
        describe('Given the user is validated', ()=>{
            test('Should return 200-statusCode and an order-body', async () => {
                await new userModel({ ...dummyUser }).save()
                await new orderModel({ ...dummyOrder }).save()

                const response = await request(app)
                .del(`/order/${orderId}`)
                .auth('john', 'secret')
    
                expect(response.statusCode).toBe(200)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: true,
                    order: expect.any(Object)
                })
                expect(response.body).not.toEqual({})
            })
        })
    })    
})
