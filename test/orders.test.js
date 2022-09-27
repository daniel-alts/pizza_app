const supertest = require('supertest')
const app = require('../index');


afterAll(() => {
    supertest(app).post('/order').send({
            "user":{
                "username":"deji",
                "password":"secret",
                "user_type":"admin"
                },
    
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

    const authorize = {"user":{
        "username":"deji",
        "password":"secret",
        "user_type":"admin"
        }}


    it('get all orders', async () => {
        const response = await supertest(app).get('/orders').send(authorize)
        expect(response.statusCode).toBe(200)
    })
    
    it("get single order with id", async () => {
        const response = await supertest(app).get('/order/632f4551f6b8aaefe5b0e5c1').send(authorize)

        expect(response.statusCode).toBe(200)
    })
    
    it("post single order", async () => {
        const response = await supertest(app).post('/order').send({ 
            ...authorize,
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
        const response = await supertest(app).patch('/order/632f5d0d55a92cd50d026386').send({
            ...authorize, 
            "state": 2
        })

        expect(response.status).toBe(200)
    })

    it("delete single order with id", async () => {
        const response = await supertest(app).delete('/order/632f45d416cc197dabc9f5bb').send(authorize)
        expect(response.status).toBe(200)
    })
})

