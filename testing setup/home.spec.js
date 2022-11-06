const request = require('supertest')
const app = require('../index');


describe('Home Route', () => {
    it('Should return status true', async () => {
        const response = await request(app).get('/').set('content-type', 'application/json')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ status: true })
    })

    it('Should return error when routed to undefined route', async () => {
        const response = await request(app).get('/undefined').set('content-type', 'application/json')
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'route not found' })
    })
});