const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const user = require("../../models/userModel");

const userId = "633d55068fe46276b6632bcc";

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
        firstName: "testing1",
        lastName: "userRoute",
        username: "test2",
        password: "12345679",
        user_type: "admin",
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
  it("DELETE /users/:id", async () => {
    await request(app)
      .delete(`/users/${userId}`)
      .expect(200)
      .expect("content-type", /json/);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
