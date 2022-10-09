/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../index')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    mongoServer.stop()
})


describe('Users', () => {
    describe('Register Route', () => {
        describe('Given valid request payload', () => {
            test('Should return 201-statusCode and a success message', async () => {
                const response = await request(app).post('/users/register')
                    .send({
                        username: 'john',
                        password: 'secret',
                        user_type: 'admin'
                    })

                expect(response.statusCode).toBe(201)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    msg: 'successfully registered'
                })
                expect(response.body).not.toEqual({})
            })
        })
    })
})