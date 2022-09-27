const supertest = require("supertest");
const app = require('../index')
const mongoose = require("mongoose");
const userRouter = require('../routers/userRouters');

app.use("/user",userRouter)





describe("USER POST ENDPOINT", ()=> {
    it(" should Create a user", async ()=> {
            const response = await supertest(app).post("/user").send({
                userName:'Hammy chald',
                Password:'Cahe73%733',
                userType: "User"
            })
            if(response.statusCode === 201) {
                expect(response.statusCode).toEqual(201);
            }
            else {
                expect(response.statusCode).toEqual(409);
            }
            
    })
})





