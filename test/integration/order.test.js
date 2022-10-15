const supertest = require("supertest");
const app = require("../../index");

describe("Order Route", () => {
  it("GET /orders works", async () => {
    const response = await supertest(app).get("/order");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it("GET /order?id works", async () => {
    const response = await supertest(app).get(
      "/order/6338a2bb0104d2186e504785"
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it("POST /orders works", async () => {
    const order = {
      items: [
        {
          name: "chicken pizza",
          price: 1200,
          size: "m",
          quantity: 5,
        },
        {
          name: "suya pizza",
          price: 600,
          size: "s",
          quantity: 1,
        },
      ],
    };

    const response = await supertest(app).post("/order").send(order);

    expect(response.status).toBe(201);

    expect(response.body.status).toBe(true);
  });

  it("DELETE /books works", async () => {
    const response = await supertest(app).delete(
      "/order/6338a2bb0104d2186e504785"
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });
});
