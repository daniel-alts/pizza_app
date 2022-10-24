const supertest = require("supertest");
const app = require("../../index");

describe("Users CRUD Operations", () => {
  it("GET /api/users: Responds with json", async () => {
    const response = await supertest(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(response.body.users.length);
  });
  it("POST /api/users: Responds with json", async () => {
    const response = await supertest(app).post("/api/users").send({
      username: "Wale",
      password: "Wale",
      email: "walemust@gmail.com",
      user_type: "admin",
    });
    expect(response.statusCode).toBe(201);
    expect(Object.keys(response.body).length).toBe(8);
  });

  it("GET /api/users/:userId: Responds with json", async () => {
    const response = await supertest(app).get(
      "/api/users/6357022d63129bc91587ff79"
    );
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body).length).toBe(8);
  });
  it("PATCH /api/users/:userId Responds with json", async () => {
    const response = await supertest(app)
      .patch("/api/users/6357022d63129bc91587ff79")
      .send({
        username: "walemust",
      });
    expect(response.statusCode).toBe(204);
  });
  it("DELETE /api/users/:userId - Deletes a user and responds with json", async () => {
    const response = await supertest(app).delete(
      "/api/users/6357022d63129bc91587ff79"
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("Orders CRUD Operations", () => {
  it("GET /api/orders: Responds with json", async () => {
    const response = await supertest(app).get("/api/orders");
    expect(response.statusCode).toBe(200);
    expect(response.body.order.orders.length).toBe(
      response.body.order.orders.length
    );
  });
  it("POST /api/orders: Responds with json", async () => {
    const response = await supertest(app)
      .post("/api/orders")
      .send({
        state: 3,
        items: [
          {
            name: "Trousers",
            price: 40,
            size: "m",
            quantity: 8,
          },
          {
            name: "Jeans",
            price: 15,
            size: "l",
            quantity: 8,
          },
          {
            name: "Pans",
            price: 7,
            size: "m",
            quantity: 15,
          },
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(Object.keys(response.body).length).toBe(2);
  });

  it("GET /api/orders/:orderId: Responds with json", async () => {
    const response = await supertest(app).get(
      "/api/orders/633bd42c2892bd81a25af98e"
    );
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body).length).toBe(2);
  });
  it("PATCH /api/orders/:orderId Responds with json", async () => {
    const response = await supertest(app)
      .patch("/api/users/633bd42c2892bd81a25af98e")
      .send({
        state: 5,
      });
    expect(response.statusCode).toBe(204);
  });
  it("DELETE /api/orders/:orderId - Deletes order and responds with json", async () => {
    const response = await supertest(app).delete(
      "/api/orders/633bd42c2892bd81a25af98e"
    );
    expect(response.statusCode).toBe(200);
  });
});
