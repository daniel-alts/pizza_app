const supertest = require("supertest");
const app = require("../index");

describe("Order Route", () => {
  it("POST /order works", async () => {
    const order = {
      items: [{ name: "chicken pizza", price: 2500, size: "m", quantity: 1 }],
    };
    const response = await supertest(app).post("/order").send(order);
    expect(response.headers["content-type"]).toBe("application/json");
    expect(response.status).toBe(200);
    expect(response.body.items[0].name).toBe("chicken pizza");
    expect(response.body.items[1].price).toBe(2500);
    expect(response.body.items[0].size).toBe("m");
  });

  it("GET /order works", async () => {
    const response = await supertest(app).get("/order");
    expect(response.headers["content-type"]).toBe("application/json");
    expect(response.status).toBe(200);
  });
});
