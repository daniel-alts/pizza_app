const supertest = require('supertest');
const app = require('../../index');
const { config } = require('dotenv');

config();
let auth = config.admin;

describe("Test Endpoints", () => {

    //integration test for home endpoint
    it('GET /', async() => {
        const response = await supertest(app).get('/').send({

        })
        console.log({ response, auth })
        expect(response.status).toBe(200)
    })
})