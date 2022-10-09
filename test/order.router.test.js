const request = require("supertest")
// const httpServer = require("../server");
// const db = require("../db");
const baseURL = "http://localhost:3334"


describe("Users Route", () => {

  const orderParams = {
    username:"saheed123",
    password:"qwerty1234",
    state:2,
    items:[
     { name: "Pizza 10", price: 200,  size: "m", quantity: 6},
     { name: "Pizza 11", price: 500,  size: "l", quantity: 5}
    ]
  }

    it("GET /orders works", async () => {
      const response = await request(baseURL).get("/orders").send(orderParams)
      expect(response.status).toBe(200)
      expect(response.body.status).toBe(true); 
    })

    it("GET /orders by id works", async () => {
      const response = await request(baseURL).get("/orders/6331c82e6261465798b1e78a").send(orderParams)
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.order.total_price).toBe(3000);
  })

    it("POST /orders by id works", async () => {
      const response = await request(baseURL).post("/orders").send(orderParams)
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.order.total_price).toBe(700);
  })
    it("PATCH /orders by id works", async () => {
      const response = await request(baseURL).patch("/orders/6331c85f6261465798b1e78e").send(orderParams)
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.order.total_price).toBe(3000);
  })
    it("DELETE /orders by id works", async () => {
      const response = await request(baseURL).delete("/orders/63334ccbae0f4851497ff161").send(orderParams)
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
  })

    })