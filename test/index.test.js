const supertest = require("supertest")
const app = require("../index")
const mongoose = require("mongoose")


beforeAll(async() => {
    await supertest(app).post("/users").send({
        "username": "ajiboy",
        "password": 1055,
        // "email": "aji@yahoo.com",
        "usertype": "Admin"
    })
})

describe("order Routes", () => {

    it("POST orders", async () => {
       const orderToAdd = {
         "state": 3,
         "items": [
           {
             "pizza_name": "cake",
             "price":  300,
             "size": "s",
             "quantity": 1
           },
           {
             "pizza_name": "chocolate",
             "price":  300,
             "size": "s",
             "quantity": 1
           },
           {
             "pizza_name": "strawberry",
             "price":  400,
             "size": "s",
             "quantity": 1
           }
         ]
       };
       const response = await supertest(app).post("/orders").auth("Kennybravo", 12345).send(orderToAdd);
       expect(response.status).toBe(201);
       expect(response.body.total_price).toBe(1000);
     });


  it("GET all orders", async () => {
    const response = await supertest(app).get("/orders").auth("Kennybravo", 12345)
    expect(response.status).toBe(200);
  });

  it("GET order by id", async () => {
    const response = await supertest(app).get("/orders?id").auth("Kennybravo", 12345)
    expect(response.status).toBe(200);
  });

 

  it("DELETE order by id", async () => {
    const response = await supertest(app).delete("/orders?id=5").auth("Kennybravo", 12345)
    expect(response.status).toBe(404);
  });
});


describe("user Routes", () => {
    it("GET all users", async() => {
        const response = await supertest(app).get("/users")
        expect (response.status).toBe(200)
    })
})




afterAll(async () => {
    await mongoose.connection.close()
})

jest.setTimeout(70000);