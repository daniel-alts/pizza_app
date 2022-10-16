const supertest = require('supertest')
const app = require('../../index')
const userRoute = require("../../routes/user")
require('dotenv').config()

const adminAuth = Buffer.from(process.env.adminAuth).toString('base64')

const user = {
    "username": "trye",
    "password": "tre3",
    "user_type": "user"
}

describe("Users Route", () => {

    it("GET /pizza returns status code 400", async () => {
        const response = await supertest(app)
            .get('/user')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'Invalid Request. Login to make operation', status: false })
    })

    it("GET /user returns status code 200", async () => {
        const response = await supertest(app)
            .get("/user")
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(200)
    })

    it("POST /user/signup status code 201", async () => {
        const response = await supertest(app)
            .post('/user/signup').send(user)
        expect(response.status).toBe(201)
    })

    it("PUT /user/:id status code 404", async () => {
        const response = await supertest(app)
            .patch('/user/').send({ "password": "youknowme", "user_type": "admin" })
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(404)
    })

    it("PUT /user/:id status code 200", async () => {
        const response = await supertest(app)
            .patch('/user/633a2c0912faeae6fee147f8').send({ "password": "youknowme", "user_type": "admin" })
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(200)
    })

    it("DELETE /user/:id status code 200", async () => {
        const response = await supertest(app)
            .patch('/user/633a2c0912faeae6fee147f8')
            .set('Authorization', 'Basic ' + adminAuth)
        expect(response.status).toBe(200)
    })
})