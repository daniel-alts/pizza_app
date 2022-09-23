const supertest = require("supertest");
const app = require('../index')
const mongoose = require("mongoose");
const orderRouters = require("../routers/orderRoute");
app.use("/order",orderRouters)






describe("ORDER ROUTE",  ()=>{
    it("Should Create a new order", async()=>{
        const response = await supertest(app).post("/post").send(body)
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty('items');
        expect(response.body.items).toHaveProperty('name', 'price','quantity');
    })
})