const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("./../index");
const userModel = require("./../models/userModel");
const orderModel = require("./../models/orderModel");

//  Runs before all the tests
beforeAll((done) => {
  // for testing purposes, we use the test DB (stub)
  const TEST_DB_URI = "mongodb://localhost:27017/pizza_app_test";
  mongoose.connect(TEST_DB_URI);

  mongoose.connection.on("connected", async () => {
    console.log("Connected to MongoDB Successfully");
    const defaultUser = {
      username: "Bolaji",
      password: "qwerty",
      user_type: "admin",
    };
    const defaultOrder = {
      items: [
        {
          name: "Vegetarian pizza",
          size: "s",
          price: 25,
          quantity: 1,
        },
      ],
    };
    await userModel.create(defaultUser);
    await orderModel.create(defaultOrder);
    done();
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
    done();
  });
});

//  Runs after all the tests
afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("orders", () => {
  const bodyWithAdminCredentials = {
    userCredentials: {
      username: "Bolaji",
      password: "qwerty",
      user_type: "admin",
    },
  };
  const newOrder = {
    order: {
      items: [
        {
          name: "Detroit Pizza",
          size: "m",
          price: 25,
          quantity: 15,
        },
      ],
    },
  };
  const updateOrder = {
    order: {
      state: 2,
    },
  };
  it("GET /orders", async () => {
    const response = await supertest(app)
      .get("/orders")
      .send(bodyWithAdminCredentials);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toHaveProperty("orders");
  });

  it("GET /orders/:orderId", async () => {
    const { _id: orderId } = await orderModel.findOne({
      name: "Vegetarian pizza",
    });
    const response = await supertest(app)
      .get(`/orders/${orderId}`)
      .send(bodyWithAdminCredentials);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toHaveProperty("order");
  });

  it("POST /orders", async () => {
    const response = await supertest(app)
      .post(`/orders`)
      .send(Object.assign({}, bodyWithAdminCredentials, newOrder));
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(201);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toHaveProperty("order");
  });

  it("PATCH /orders/:orderId", async () => {
    const { _id: orderId } = await orderModel.findOne({
      name: "Vegetarian pizza",
    });
    const response = await supertest(app)
      .patch(`/orders/${orderId}`)
      .send(Object.assign({}, bodyWithAdminCredentials, updateOrder));
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toHaveProperty("order");
  });
  it("DELETE /orders/:orderId", async () => {
    const { _id: orderId } = await orderModel.findOne({
      name: "Vegetarian pizza",
    });
    const response = await supertest(app)
      .delete(`/orders/${orderId}`)
      .send(bodyWithAdminCredentials);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
