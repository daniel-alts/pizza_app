let server = require('../index')
let supertest = require('supertest')
let users = require('../fixtures/user.json')


describe('user route', () => {
    test('POST /user/signup - add first user', async () => {
        let res = await supertest(server).post("/user/signup").send(users[0])
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/signup - add second user', async () => {
        let res = await supertest(server).post("/user/signup").send(users[1])
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/signup - add 3rd user', async () => {
        let res = await supertest(server).post("/user/signup").send(users[2])
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/signup - add 4th user', async () => {
        let res = await supertest(server).post("/user/signup").send(users[3])
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/login - login first user', async () => {
        let res = await supertest(server).post("/user/login").set("Authentication", `Bearer ${users[0].username} ${users[0].password} ${users[0].email}`)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Login successful, Visit the order routes to make your orders"})
    }, 40000);
    
})