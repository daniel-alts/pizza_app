const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");

connectToMongoDB();

require("dotenv").config();

 
describe("Order Route", () => {

    it("POST /order works", async () => {
        const response = await connectToMongoDB().get("/order")
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(200)
        expect(response.text).toBe(JSON.stringify(order))
    })

    it("GET /order/:orderId works", async () => {
        const response = await connectToMongoDB().get("/order/:orderId")
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(200)
        expect(response.text).toBe(JSON.stringify(order))
    })

    it("GET /orders works", async () => {
        const response = await connectToMongoDB().post("/orders")
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(201)
    })

    it("DELETE /order/:id works", async () => {
        const response = await connectToMongoDB().delete("/order/:id")
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(404)

        const response2 = await connectToMongoDB().get("/order/:id")
        expect(response2.headers["content-type"]).toBe("application/json")
        expect(response2.status).toBe(200)
    })

    it("PATCH /order/:id works", async () => {
        const response = await connectToMongoDB().update("/order/:id")
        expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(404)

        const response2 = await connectToMongoDB().update("/order/:id")
        expect(response2.headers["content-type"]).toBe("application/json")
        expect(response2.status).toBe(422)
    })
})