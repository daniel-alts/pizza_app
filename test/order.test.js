require('dotenv').config()
const supertest = require('supertest')
const app = require('./app');

const token = process.env.TOKEN

afterAll(() => {
    supertest(app).post('/orders').set({Authorization: `BEARER ${token}`}).send({
        "_id": "632f0c72fa0061cdacdcc266",
            "created_at": "2022-09-24T13:56:02.345Z",
            "state": 3,
            "total_price": 4000,
            "items": [
                {
                "name": "Large Cheese Pizza",
                "price": 4000,
                "size": "l",
                "quantity": 2,
                "_id": "632f0c72fa0061cdacdcc267"
                }
            ]
        })
})

describe('orders', () => {
    describe('accessing orders without auth', () => {
        it('get all orders', async () => {
            const response = await supertest(app).get('/orders')
            expect(response.statusCode).toBe(401)
        })
        
        it("get single order with id", async () => {
            const response = await supertest(app).get('/orders/632f0b41fa0061cdacdcc244')

            expect(response.statusCode).toBe(401)
        })
        
        it("post single order", async () => {
            const response = await supertest(app).post('/orders').send({ 
                "items": [
                    {
                      "name": "Large Cheese And Pepperoni",
                      "price": 8000,
                      "size": "l",
                      "quantity": 2,
                    }
                ]
            })
            expect(response.status).toBe(401)
        })

        it("update single order with id", async () => {
            const response = await supertest(app).patch('/orders/632f0b41fa0061cdacdcc244').send({ 
                "state": 3
            })

            expect(response.status).toBe(401)
        })

        it("delete single order with id", async () => {
            const response = await supertest(app).delete('/orders/6e324d3fd33324b8132ade91')
            expect(response.status).toBe(401)
        })
    })



    describe('accessing orders with auth', () => {
        it('get all orders', async () => {
            const response = await supertest(app).get('/orders').set({Authorization: `BEARER ${token}`})
            expect(response.statusCode).toBe(200)
        })
        
        it("get single order with id", async () => {
            const response = await supertest(app).get('/orders/632f0b41fa0061cdacdcc244').set({Authorization: `BEARER ${token}`})

            expect(response.statusCode).toBe(200)
            expect(JSON.parse(response.text).order._id).toBe('632f0b41fa0061cdacdcc244')
        })
        
        it("post single order", async () => {
            const response = await supertest(app).post('/orders').set({Authorization: `BEARER ${token}`}).send({ 
                "items": [
                    {
                      "name": "Large Cheese And Pepperoni",
                      "price": 8000,
                      "size": "l",
                      "quantity": 2,
                    }
                ]
            })
            expect(response.status).toBe(200)
        })

        it("update single order with id", async () => {
            const response = await supertest(app).patch('/orders/632f0b41fa0061cdacdcc244').set({Authorization: `BEARER ${token}`}).send({ 
                "state": 3
            })

            expect(response.status).toBe(200)
        })

        it("delete single order with id", async () => {
            const response = await supertest(app).delete('/orders/6e324d3fd33324b8132ade91').set({Authorization: `BEARER ${token}`})
            expect(response.status).toBe(200)
        })
    })

})


