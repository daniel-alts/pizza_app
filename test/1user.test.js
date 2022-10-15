let server = require('../index')
let supertest = require('supertest')
let users = require('../fixtures/user.json')


describe('user route', () => {
    test('POST /user/signup - add first user', async () => {
        let res = await supertest(server).post("/user/signup")
        .field("username", users[0].username)
        .field("password", users[0].password)
        .field("user_type", users[0].user_type)
        .field("email", users[0].email)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/signup - add second user', async () => {
        let res = await supertest(server).post("/user/signup")
        .field("username", users[1].username)
        .field("password", users[1].password)
        .field("user_type", users[1].user_type)
        .field("email", users[1].email)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/signup - add 3rd user', async () => {
        let res = await supertest(server).post("/user/signup")
        .field("username", users[2].username)
        .field("password", users[2].password)
        .field("user_type", users[2].user_type)
        .field("email", users[2].email)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/signup - add 4th user', async () => {
        let res = await supertest(server).post("/user/signup")
        .field("username", users[4].username)
        .field("password", users[4].password)
        .field("user_type", users[4].user_type)
        .field("email", users[4].email)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({status: true, message: "Signup successful, Login to make your orders"})
    }, 70000);

    test('POST /user/login - login first user', async () => {
        let res = await supertest(server).post("/user/login")
        .field("username", users[0].username)
        .field("password", users[0].password)
        .field("email", users[0].email)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("user logged in successfully")
    }, 40000);

    test('POST /user/login - login third user', async () => {
        let res = await supertest(server).post("/user/login")
        .field("username", users[2].username)
        .field("password", users[2].password)
        .field("email", users[2].email)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("user logged in successfully")
    }, 40000);
    
})