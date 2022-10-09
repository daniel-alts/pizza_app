const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const user = require("../../models/userModel");

const userId = "6342a1dfa9bfbacd8575fa6b";

describe("userRoute", () => {
  // Get all users
  it("GET /users", async () => {
    await request(app).get("/users").expect(200).expect("content-type", /json/);
  });

  // register user : Because i set a validator called unique to my username, creating a user with same username in the db gives error.
  it("POST /users", async () => {
    await request(app)
      .post("/users")
      .send({
        username: "testing4",
        email: "adamma@gmail.com",
        password: "123456789",
        passwordConfirm: "12345679",
        user_type: "user",
      })
      .expect(201)
      .expect("content-type", /json/);
  });

  // get a user by id
  it("GET /users/:id", async () => {
    await request(app)
      .get(`/users/${userId}`)
      .expect(200)
      .expect("content-type", /json/);
  });

  // update a user
  it("PATCH /users/:id", async () => {
    await request(app)
      .patch(`/users/${userId}`)
      .send({
        lastName: "updateTest",
      })
      .expect(200)
      .expect("content-type", /json/);
  });

  //delete user : This test deletes the id used in the previous test (userId) when run.
  // it("DELETE /users/:id", async () => {
  //   await request(app)
  //     .delete(`/users/${userId}`)
  //     .expect(200)
  //     .expect("content-type", /json/);
  // });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
