const supertest = require("supertest");
const app = require("../index");
const ordersRouters = require("../routers/ordersRoute");
app.use("/orders", ordersRouters);

describe("ORDERS ROUTE", () => {
  it("Should get All datas from the database", async () => {
    const response = await supertest(app).get("/orders");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
