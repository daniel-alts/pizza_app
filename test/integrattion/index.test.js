const supertest = require("supertest");
const server = require("../../index");

describe("orders routes", () => {
  it("POST /orders: action: works ", async () => {
    const response = await (
      await supertest(server).get("/orders")
    )
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.status).toBe(200)
  });
});
