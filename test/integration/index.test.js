const supertest = require('supertest')
const app =  require('../../index')

describe("Order Route", () => {
    
    it("GET /order works", async() => {
        const response = await supertest(app).get("/order")
        expect(response.status).toBe(200)
        //expect(response.body.orders.length).toBe(6)
        expect(response.body.status).toBe(true)
    })

    it("GET /order/:id works", async() => {

        const response = await supertest(app).get(
          "/order/632cce8f5ab3f06a1972514b"
        );
        expect(response.status).toBe(200)
        expect(response.body.order.total_price).toBe(17000)

    })

    it("DELETE /order/:id works", async() => {

        const response = await supertest(app).delete(
          "/order/632ccdb434a530b529e3a3ad"
        );
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(true)
    })

    it("POST /order works", async() => {
        const order = {
          "items": [
            {
              name: "crayfish pizza",
              price: 1500,
              size: "l",
              quantity: 5,
            },
            {
              name: "spicy pizza",
              price: 1600,
              size: "s",
              quantity: 9,
            },
          ],
        };
        const response = await supertest(app).post('/order').send(order)
        expect(response.status).toBe(201)
        expect(response.body.status).toBe(true)
        expect(response.body.order.total_price).toBe(21900);
    })

    // it("PATCH /order/:id works", async() => {

    // })
})