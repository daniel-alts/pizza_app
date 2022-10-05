const supertest = require("supertest");
const app = require('../index');


describe("Order Routes", () => {
  it("Orders endpoint", async () => {
        const res = await supertest(app)
      .get("/orders")
      expect(res.status).toBe(200)
  
  });

});
