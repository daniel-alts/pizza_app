const supertest = require("supertest");
const server = require("../../index");

describe("orders routes", () => {
  it("POST /order: action: works ", async () => {
    const response = await (
      await supertest(server).post("/order")
    ).send({
      state: 2,
      total_price: 700,
      items: [
        {
          name: "pepperoni",
          price: 700,
          size: "m",
          quantity: 2,
        },
      ],
    });
    expect(response.headers["content-type"]).toBe("application/json")
    expect(response.statusCode(200))
  });
});
