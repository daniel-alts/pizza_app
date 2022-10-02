const supertest = require("supertest");

const app = require("./test.index");

describe("User Authentications", () => {
  let tokenData;
  it("should test for user signup", async () => {
    const response = await supertest(app).post("/user/signup").send({
      username: "username",
      password: "password",
    });
    expect(response.statusCode).toBe(201);
  });

  it("should test for user signin", async () => {
    const response = await supertest(app).post("/user/signin").send({
      username: "username",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("Order ROutes", async () => {
  it("should test for get all orders", async () => {
    const response = await supertest(app)
      .get("/orders/signin?order=asc&perPage=4&page=1")
      .send();
    expect(response.statusCode).toBe(200);
  });

  it("should test for get an order", async () => {
    const response = await supertest(app).get("/orders/listOne/2222").send();
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toEqual(false);
  });

  it("should test for create an order", async () => {
    const response = await supertest(app)
      .post("/orders/signin")
      .send({
        items: [
          {
            name: "Order One",
            price: "500",
            size: "l",
            quantity: "5",
          },
          {
            name: "Order Three",
            price: "200",
            size: "m",
            quantity: "5",
          },
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toEqual(true);
  });

  it("should test for edit an order", async () => {
    const response = await supertest(app)
      .patch("/orders/edit/12345755325")
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toEqual(false);
  });

  it("should test for delete an order", async () => {
    const response = await supertest(app)
      .delete("/orders/delete/58589853")
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toEqual(false);
  });
});
