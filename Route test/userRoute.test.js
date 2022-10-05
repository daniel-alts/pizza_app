const supertest = require("supertest");
const server = require("../app");
describe("users route", () => {
  // it("test", async () => {
  //   const response = await supertest(server).get("/users");
  //   expect(response.status).toBe(200);
  // });
  it("GET /users", async () => {
    const response = await supertest(server).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
  it("GET /users?id", async () => {
    const response = await supertest(server).get(
      "/users/633c493d3d0f7f1cbcb130a7"
    );
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("mark smith");
  });
  it("POST /users", async () => {
    const response = await (
      await supertest(server).post("/users")
    ).send({
      username: "john Smith",
      password: "1234567",
      user_type: "admin",
    });
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("john smith");
  });
  it("DELETE /users", async () => {
    const response = await supertest(server).post(
      "/users?_id=633c493d3d0f7f1cbcb130a7"
    );
    expect(response.status).toBe(500);
    expect(response.body.username).toBe("mark smith");
  });
});
