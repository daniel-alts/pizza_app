const supertest = require("supertest");
const mongoose = require('mongoose');
const app = require('../index')


beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017');
  })
  
  afterEach(async () => {
    await mongoose.connection.close();
  });


describe("User Route", ()=> {
    it("GET /user works", async ()=> {
            const response = await supertest(app).get("/user")
            expect(response.headers["content-type"].split(';')[0]).toBe("application/json")
          expect(response.body.length).toBe(3)            
    })

    it("GET /user?id works", async () => {
        const response = await supertest(app).get("/user/63376ed6ab98e0effc81b5b9")
        expect(response.headers["content-type"].split(';')[0]).toBe("application/json")
        expect(response.status).toBe(200)
        expect(response.body.username).toBe("tunndev")
    })
})






