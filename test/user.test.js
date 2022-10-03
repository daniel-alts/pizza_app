const supertest = require('supertest');
const app = require('../index');
const userRouter = require('../routes/userroute');


app.use('/users',userRouter);


describe('User', ()=> {
    it("should create a user",async()=> {
        const response = await (await supertest(app).post("/users")).send({
            userName:'omotega',
            password:'123456',

        })
        if(response.statusCode === 201) {
            expect(response.statusCode).toEqual(201);
        } else{
            expect(response.statusCode).toEqual(409);
        }
    })
})