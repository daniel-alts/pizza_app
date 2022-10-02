const supertest = require('supertest')
const app = require('../index');


afterAll(() => {
    supertest(app).post('/orders').send({
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



describe('accessing orders with auth', () => {


    it('get all orders', async () => {
        const response = await supertest(app).get('/orders').set({Authorization:"Basic emlrb2tvbWFuOnNlY3JldA=="})
        expect(response.statusCode).toBe(200)
    })
    
    it("get single order with id", async () => {
        const response = await supertest(app).get('/orders/632f4551f6b8aaefe5b0e5c1').set({Authorization:"Basic emlrb2tvbWFuOnNlY3JldA=="})

        expect(response.statusCode).toBe(200)
    })
    
    it("post single order", async () => {
        const response = await supertest(app).post('/orders').set({Authorization:"Basic emlrb2tvbWFuOnNlY3JldA=="}).send({ 
            "items": [
                {
                    "name": "Large Cheese And Pepperoni",
                    "price": 8000,
                    "size": "l",
                    "quantity": 2
                }
            ]
        })
        expect(response.status).toBe(200)
    })

    it("update single order with id", async () => {
        const response = await supertest(app).patch('/orders/632f5d0d55a92cd50d026386').set({Authorization:"Basic emlrb2tvbWFuOnNlY3JldA=="}).send({ 
            "state": 2
        })

        expect(response.status).toBe(200)
    })

    it("delete single order with id", async () => {
        const response = await supertest(app).delete('/orders/632f45d416cc197dabc9f5bb').set({Authorization:"Basic emlrb2tvbWFuOnNlY3JldA=="})
        expect(response.status).toBe(200)
    })
})

