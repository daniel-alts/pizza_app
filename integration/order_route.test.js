const supertest = require("supertest")
const server = require("../index")

describe("Order Route", ()=>{
    it("GET /order works", async ()=>{
        const response = await supertest(server).get("/order")
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })

    it("GET /order?id works", async ()=>{
        const response = await supertest(server).get("/order?id=1") // get a id to use here
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Alexander Chosen")
        expect(response.body.size).toBe("l")
    })

    it("POST /order works", async ()=>{
        const order2add ={
            "items":[{
                "name": "Wisdom Chibundu",
                "price": 1000,
                "size": "m",
                "quantity": 3
            }]
        }
        const response = await supertest(server).post("/order").send(order2add)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Wisdom Chibundu")
        expect(response.body.size).toBe("m")
        expect(response.body.length).toBeGreaterThan(3)

    })

    it("PATCH /order?id works", async ()=>{
        const order2Update ={
            "state": 4
        }

        const response = await supertest(server).patch("/order?id=2").send(order2Update) // get a id to use here
        expect(response.status).toBe(200)
        expect(response.body.state).toBe(4)

    })

    it("DELETE /order?id works", async ()=>{
        const response = await supertest(server).delete("/order?id=4") // get a id to use here
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(true)

        const response2 = await supertest(server).get("/order")
        expect(response2.status).toBe(200)
        expect(response.body.length).toBe(4)
    })
})