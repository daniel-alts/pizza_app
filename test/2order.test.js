let server = require('../index')
let supertest = require('supertest')
let orders = require('../fixtures/order.json')
let users = require('../fixtures/user.json')


describe('order route', () => {
    test('POST /order - first order by first user', async () => {
        let res = await supertest(server).post("/order").send(orders[0]).set("Authentication", `Bearer ${users[0].username} ${users[0].password} ${users[0].email}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.order.items[0].name).toBe("Pepperoni")
        expect(res.body.order.items[0].size).toBe("m")
        expect(res.body.order.total_price).toBe(2000)
    }, 70000);

    test('POST /order - 2nd order by first user', async () => {
        let res = await supertest(server).post("/order").send(orders[1]).set("Authentication", `Bearer ${users[0].username} ${users[0].password} ${users[0].email}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.order.items[0].name).toBe("Pepperoni")
        expect(res.body.order.items[0].size).toBe("l")
        expect(res.body.order.total_price).toBe(6000)
    }, 70000);

    test('POST /order - 3rd order by first user', async () => {
        let res = await supertest(server).post("/order").send(orders[2]).set("Authentication", `Bearer ${users[0].username} ${users[0].password} ${users[0].email}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.order.items[0].name).toBe("Pepperoni")
        expect(res.body.order.items[0].size).toBe("s")
        expect(res.body.order.total_price).toBe(3000)
    }, 70000);

    test('GET /order - get all orders made by first user', async () => {
        let res = await supertest(server).get("/order?sort_by=total_price,created_at&order=asc&page=3&skip=0").set("Authentication", `Bearer ${users[0].username} ${users[0].password} ${users[0].email}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.orders.length).toBe(3)
    }, 70000);

    test('PATCH /order - update 3rd order made by 3rd user(admin) in db', async () => {
        let res = await supertest(server).patch("/order/3").send({state: 2}).set("Authentication", `Bearer ${users[2].username} ${users[2].password} ${users[2].email}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.order.state).toBe(2)
    }, 70000);

    test('DELETE /order - delete order with id-3 made by 3rd user(admin) in db', async () => {
        let res = await supertest(server).delete("/order/3").set("Authentication", `Bearer ${users[2].username} ${users[2].password} ${users[2].email}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
    }, 70000);
})