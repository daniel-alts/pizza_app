const app = require('../index')
const supertest = require('supertest')
const ordersRoutes = require('../routes/ordersRoutes')
const usersRoutes = require('../routes/usersRoutes')


describe('app', () => {
    it('Should get all orders', async () => {
        const response = await supertest(app).get('/orders?username=ssamuel&password=myguyy')
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(200)
    })
})