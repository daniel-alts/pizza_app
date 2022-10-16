const supertest = require('supertest');
const app = require("../../index")


describe('Tests for User Route', () => {

  it('GET /user Works', async () => {
    const response = await supertest(app).get("/user")
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.status).toBe(200)
  });


  it('GET /user/:id Works', async () => {
    const response = await supertest(app).get("/user/633303ed800d49db97dd30bb")
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.status).toBe(200)
    expect(response.body.username).toBe("Mike")
    expect(response.body.user_type).toBe("admin")
  });


  // it("POST /user works", async () => {
  //   const userToAdd = {
  //       "username": "Rising Odegua",
  //       "password": "43210",
  //       "user_type": "admin",
  //   }
  //   const response = await supertest(app).post("/user").send(userToAdd)
  //   expect(response.headers["content-type"]).toBe("text/html; charset=utf-8")
  //   expect(response.status).toBe(201)
  // })

  it("PUT /user/:id works", async () => {
    const updateDetails = {
        "username": "Rising Odegua",
        "password": "43210",
        "user_type": "user",
    }
    const response = await supertest(app).put("/user/6333041d800d49db97dd30c1").send(updateDetails)
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8")
    expect(response.status).toBe(201)
  })


  // it("DELETE /user/:id works", async () => {
  //   const response = await supertest(app).delete("/user/634bbd6be3e98db384559785")
  //   expect(response.headers["content-type"]).toBe("text/html; charset=utf-8")
  //   expect(response.status).toBe(200)
  // })
});