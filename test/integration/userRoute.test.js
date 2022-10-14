const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");
const user = require("../../models/userModel");

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNDE4NjQyYzdiN2NkYjI3MjBjMWYzNCIsImVtYWlsIjoic2FtbXk0NEBnbWFpbC5jb20ifSwiaWF0IjoxNjY1MjQ0OTU4fQ.4nCkmgpmkJDTCSQL7_lueyJPYL9q05wYzIUONvZuPQo";
// const userId = "63418632c7b7cdb2720c1f32";

describe("userRoute", () => {
  // Get all users
  it("GET /users", async () => {
    await request(app)
      .get("/users")
      .set({ Authorization: "Bearer " + token })
      .expect(200)
      .expect("content-type", /json/);
  });
});
