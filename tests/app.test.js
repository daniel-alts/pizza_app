const supertest = require("supertest");
const app = require("./test_index");

describe('users', () => {
    it("POST /users", async() => {
        const response = await supertest(app).post('/users').send({
            "username":"esther5",
            "password": "password",
            "user_type": "admin"

        });
        expect(response.statusCode).toBe(201);
    });

    it("GET /users", async() => {
        const response = await supertest(app).get('/users').send({
            "username":"esther5",
            "password": "password"

        });
        expect(response.statusCode).toBe(200);
    });

    it("POST /users", async() => {
        const response = await supertest(app).post('/users').send({
            "username":"esther5",
            "password": "password"

        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            message: "Bad Request"
        });
    });
})

describe('orders', () => {
    it("POST /orders", async() => {
        const response = await supertest(app).post('/orders').send({
            "username":"esther5",
            "password": "password",
            "items": [
                {
                    "name": "The Pepperoni Hottie",
                    "price": 7500,
                    "size": "l",
                    "quantity": 1
                }
            ]

        });
        expect(response.statusCode).toBe(201);
    });

    it("GET /orders", async() => {
        const response = await supertest(app).get('/orders').send({
            "username":"esther5",
            "password": "password"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
    });

    it("GET /orders/:id", async() => {
        const response = await supertest(app).get('/orders/6330c6dc3097356392465aca').send({
            "username":"esther5",
            "password": "password"
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe(false);
    });

    it("PATCH /orders/:id", async() => {
        const response = await supertest(app).patch('/orders/6330c6dc3097356392465aca').send({
            "username":"esther5",
            "password": "password"
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe(false);
    });

    it("DELETE /orders/:id", async() => {
        const response = await supertest(app).delete('/orders/6330c6dc3097356392465aca').send({
            "username":"esther5",
            "password": "password"
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe(false);
    });
    
})