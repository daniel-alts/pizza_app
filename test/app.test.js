const supertest = require("supertest");
const app = require("../index");

describe("User Routes", () => {
  let tokenData;
  it("Signup /users", async () => {
    const response = await supertest(app)
      .post("/user/signup")
      .set("Accept", /json/)
      .send({
        username: "roqeeb",
        password: "password",
      });
    // expect(response.statusCode).toBe(200);
    // expect(response.body).toEqual({
    //   statusCode: 400,
    //   message: "Bad Request",
    //   status: true,
    //     user,
    //     token,
    // });
  });
});
