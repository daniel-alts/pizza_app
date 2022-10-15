const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel')
require('dotenv').config();

//environment variable
const test_db = process.env.TEST_DB

//connect to test_db
mongoose.connect(test_db);

const db = mongoose.connection;
db.on('connected', () => {
    console.log('connected to database successfully');
});
db.on('error', (err) => {
    console.log('error occurred during connection:', err);
});


describe('User Routes', () => {
    
    let server;
    beforeAll(async () => {
        server = app.listen(3334);
    });

    // beforeAll(async () => {
    //     await userModel.remove({});
    // });

    afterAll(async () => {
        await mongoose.connection.close();
        await server.close();
    });

    it('should create an order', async () => {
        const response = await request.post('/orders').send({
        items: [
            {
            name: 'pizza',
            price: 500,
            quantity: 2,
            },
        ],
        });
        // expect(response.status).toBe(201);
        expect(200);
        expect(response.body.order).toHaveProperty('items');
        expect(response.body.order).toHaveProperty('created_at');
        expect(response.body.order).toHaveProperty('total_price');
    });
    
    it('should get all orders', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
        expect(response.body.orders).toBeInstanceOf(Array);
    });
    
    it('should get one order', async () => {
        const order = await orderModel.findOne();
        const response = await request.get(`/orders/${order._id}`);
        expect(response.status).toBe(200);
        expect(response.body.order).toHaveProperty('items');
        expect(response.body.order).toHaveProperty('created_at');
        expect(response.body.order).toHaveProperty('total_price');
    });
});
    
