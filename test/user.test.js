// let server = require('../index')
// let supertest = require('supertest')
// let users = require('../fixtures/user.json')

// describe('user route', () => {
//     // ADDS 1st user
//     test('POST /user/signup - add first user', async () => {
//         let res = await supertest(server).post("/user/signup").send(users[0])
//         expect(response.status).toBe(201)
//         expect(response.body.status).toBe("true")
//     });

//     test('POST /user/signup - add second user', async () => {
//         let res = await supertest(server).post("/user/signup").send(users[1])
//         expect(response.status).toBe(201)
//         expect(response.body.status).toBe("true")
//     });

//     test('POST /user/signup - add 3rd user', async () => {
//         let res = await supertest(server).post("/user/signup").send(users[2])
//         expect(response.status).toBe(201)
//         expect(response.body.status).toBe("true")
//     });

//     test('POST /user/signup - add 4th user', async () => {
//         let res = await supertest(server).post("/user/signup").send(users[3])
//         console.log(res)
//         expect(response.status).toBe(201)
//         expect(response.body.status).toBe("true")
//     });
    
// })