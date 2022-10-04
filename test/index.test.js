
const request = require("supertest")
const app = require("../index")
const mongoose = require("mongoose")
const { deleteOne } = require("../models/orderModel")

beforeAll(async()=>{
    await request(app).post("/user")
    .send({
        newUser:{
            username: "moyo",
            password: "testing12",
            roles:  "admin"
        }
    })

})

describe("order routes", ()=>{
    it("post orders",async()=>{
        const response = await request(app)
        .post("/order")
        .auth("macmizy","testing12") 
        .send({"state": 3,
        "items": [{
          "name": "bread",
          "price": 105,
          "size": "s",
          "quantity": 1
          },
          {"name": "toast bread",
          "price": 410,
          "size": "l",
          "quantity": 4
          },
          {"name": "sharwama",
          "price": 250,
          "size": "m",
          "quantity": 1
          }
          ]
        })
        expect(response.statusCode).toBe(200)

    })

    it("get all orders",async()=>{
        const response = await request(app)
        .get("/order")
        .auth("macmizy","testing12") 
        expect(response.statusCode).toBe(200)
    })

    it("get order by id",async()=>{
        const response = await request(app)
        .get("/order/633832eab4f36e5888113a74")
        .auth("macmizy","testing12") 
        expect(response.statusCode).toBe(404)
    })

    it("get sorted order",async()=>{
        const response = await request(app)
        .get("/order?sortby=price&order=desc&page=1&limit=3")
        .auth("macmizy","testing12") 
        expect(response.statusCode).toBe(200)
    })
}) 

describe("user routes", ()=>{
    it("get all users",async()=>{
        const response = await request(app)
        .get("/user")
        expect(response.statusCode).toBe(200)
    })

})





afterAll(async ()=>{
        await mongoose.connection.close()
    
    
})