const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment')
const Order = require('../../model/orderModel')
const User = require('../../model/usersModel')

const app = require('../../app')

// ********************IMPLEMENT TEST*************************************//

describe('Order Route', () => {
    //add database connection hook - beforeAll()
    let token;
    beforeAll(async() => {
        await mongoose.createConnection('mongodb://localhost:27017/test-db')

        //sign up a new user
        await User.create({
            username: "John",
            password: "123456"
        })

        //login user
        const login = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            username: "John",
            password: "123456"
        })

        token = login.body.message
        
    })

        afterEach(async () => {
            await User.deleteMany();
        })

        afterAll(async () => {
            await mongoose.connection.close();
        })



        it('should get all orders', async () => {
            await Order.create({
                state: 1,
                items:{name: 'Pizzapie', price: 1000, quantity: 1, size: 'm'},
                created_at: moment().format('MM/DD/YYYY'),
                total_price: 900
            })

            const response = await request(app)
            .get('/api/orders')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            // .expect(200)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('orders')
            expect(response.body).toHaveProperty('status', true)

           
        })
   
})
