const supertest = require('supertest')
const app = require('../../index')
const orderRoute = require("../../routes/order")
require('dotenv').config()

const adminAuth = Buffer.from(process.env.adminAuth).toString('base64')
const userAuth = Buffer.from(process.env.userAuth).toString('base64')
const order = {
    "items": [
        {
            "name": "Test pizza",
            "quantity": 1,
            "price": 1000,
            "size": "l"
        }
    ]
}

describe("Pizza Order Route", () => {

    it("GET /pizza returns status code 400", async () => {
        const response = await supertest(app)
            .get('/pizza')
        expect(response.status).toBe(400)
        expect(typeof response.body).toBe("object")
        expect(response.body).toEqual({ message: 'Invalid Request. Login to make operation', status: false })
    })

    it("GET /pizza returns status code 200", async () => {
        const response = await supertest(app)
            .get("/pizza")
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(200)
    })

    it("POST /pizza/createOrder status code 201", async () => {
        const response = await supertest(app)
            .post('/pizza/createOrder').send(order)
            .set('Authorization', 'Basic ' + userAuth)
        expect(response.status).toBe(201)
    })

    it("PUT /pizza/:id status code 404", async () => {
        const response = await supertest(app)
            .patch('/pizza/').send({ "state": 3 })
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(404)
    })

    it("PUT /pizza/:id status code 200", async () => {
        const response = await supertest(app)
            .patch('/pizza/633a15d90ad196f7407d5579').send({ "state": 4 })
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(200)
    })

    it("DELETE /pizza/:id status code 200", async () => {
        const response = await supertest(app)
            .patch('/pizza/633a15d90ad196f7407d5579')
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(200)
    })
})