const request = require('supertest')
const { connect } = require('./database')
const UserModel = require('../models/userModel')
const app = require('../index');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'jules', 
            password: 'Password123', 
            firstName: 'Juliana',
            lastName: 'Micheal',
            email: 'jules@mail.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('username', 'jules')
        expect(response.body.user).toHaveProperty('firstname', 'Juliana')
        expect(response.body.user).toHaveProperty('lastname', 'Micheal')
        expect(response.body.user).toHaveProperty('email', 'jules@mail.com')        
    })


    it('should login a user', async () => {
        // create user in out db
        const user = await UserModel.create({ username: 'jules', password: '123456'});

        // login user
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'tobi', 
            password: '123456'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})

