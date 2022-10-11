const supertest = require("supertest")
const app = require("../app")
jest.useFakeTimers()

describe("Orders Route",()=>{
    it("should return all orders", async()=>{
        const response = await supertest(app).get("/order")
        expect(response.headers['content-type']).toBe("application/json")
        expect(response.status).toBe(200)
      
    })
})