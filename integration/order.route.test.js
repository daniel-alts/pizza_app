const request = require("supertest");
const app = require("../index");

// ----------******-----integration test before the implementation of the JWT----------******-------

describe("pizza api signup", () => {
  it("should signup a new user", async () => {
    const body = {
      username: "name",
      password: "123456",
      email: "name@gmail.com",
      phone_number: "09012345678",
    };

    const response = await request(app).post("/user").send(body);
    expect(response.status).toEqual(201);
    expect(response.body.status).toBe(true);
    expect(response.body.user.username).toBe("name");
    expect(response.body.user.email).toBe("name@gmail.com");
    expect(response.body.user.phone_number).toBe(9012345678);
  });
});

describe("pizza API routes", () => {
  // Post order
  it("returns status code 201 if order is made and query params are passed", async () => {
    const body = {
      items: [
        {
          name: "Cheese Special",
          quantity: 2,
          price: 5000,
          size: "l",
        },
      ],
    };
    const response = await request(app)
      .post("/order/?username=ade&password=123456")
      .send(body);
    expect(response.status).toEqual(201);
    expect(response.body.order.items[0].name).toBe("Cheese Special");
    expect(response.body.status).toBe(true);
  });

  it("returns status code 404 if order is made and query params are not passed", async () => {
    const body = {
      items: [
        {
          name: "Cheese Special",
          quantity: 2,
          price: 5000,
          size: "l",
        },
      ],
    };
    const response = await request(app).post("/order").send(body);
    expect(response.status).toEqual(404);
  });

  // Get an order by ID
  it("Should return an order if an order is requested by ID", async () => {
    const response = await request(app).get(
      "/order/6347f5c5833dad9ab420b0d9?username=ade&password=123456"
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  //Get all orders by non-admin should not work
  it("Should throw an error if non admin tries to access all orders", async () => {
    const response = await request(app).get(
      "/order/?username=adeniyi&password=123456"
    );
    expect(response.status).toBe(401);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe(
      "You are unauthorized to perform this operation"
    );
  });

  //Get all orders by admin should work
  it("Should work if admin tries to access all orders", async () => {
    const response = await request(app).get(
      "/order/?username=ade&password=123456"
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  // Update an order by ID
  it("Should update an order  by ID", async () => {
    const body = {
      state: 3,
    };
    const response = await request(app)
      .patch("/order/6347f5c5833dad9ab420b0d9?username=ade&password=123456")
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.state).toBe(3);
  });

  // Delete an order by ID
  it("Should delete an order by ID", async () => {
    const response = await request(app).delete(
      "/order/634814f261238bac59d15ff2?username=ade&password=123456"
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.deletedCount).toBe(1);
  });
});
