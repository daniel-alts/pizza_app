const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
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

    beforeAll(async () => {
        await userModel.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await server.close();
    });

    it('should create a user', async () => {
        const response = await request.post('/users').send({
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johnDoey',
            password: '123456',
            userType: 'user'
        });
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('firstName');
    });

    it('should get all users', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
        expect(response.body.users).toBeInstanceOf(Array);
    });

    it('should get one user', async () => {
        const user = await userModel.findOne();
        const response = await request.get(`/users/${user._id}`);
        expect(response.status).toBe(200);
        expect(response.body.user).toHaveProperty('firstName');
    });
});
