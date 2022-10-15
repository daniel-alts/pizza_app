const mongoose = require("mongoose");
const supertest = require("supertest");

// const { connectToMongoDB } = require("../pizzaAppDb");
require("dotenv").config();

const PIZZA_TEST_CONNECTION_URL = process.env.PIZZA_TEST_CONNECTION_URL;
const app = require("../app");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const TEST_TOKEN = process.env.TEST_TOKEN;
let order;

beforeAll((done) => {
  mongoose.connect(PIZZA_TEST_CONNECTION_URL);

  mongoose.connection.on("connected", async () => {
    console.log("connected to Mongodb succesfully");
    const orderSeed = {
      items: [
        {
          name: "KFC restaurant",
          price: 200,
          size: "s",
          quantity: 4,
        },
        {
          name: "KFC rice",
          price: 400,
          size: "s",
          quantity: 2,
        },
      ],
    };
    const userSeed = {
      username: "jetcode",
      password: "qwerty12",
      user_type: "admin",
    };
    order = await Order.create(orderSeed);
    await User.create(userSeed);
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
    console.log("An error occured");
  });
  done();
});
afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// ORDERS ROUTE TESTING
describe("/orders", () => {
  it("GET /orders", async () => {
    const response = await supertest(app)
      .get("/orders")
      .set("Authorization", `Bearer ${TEST_TOKEN}`); // authorization
    console.log("😃😃😃✨", response.body);
    expect(response.status).toBe(200);
    expect(response.body.orders.length).toBe(0);
    expect(response.body).toHaveProperty("orders");
  });
  // POST ROUTE TESTING
  it("POST /orders", async () => {
    const body = {
      items: [
        {
          name: "iya yusuf pizza ",
          price: 200,
          size: "s",
          quantity: 4,
        },
        {
          name: "item 7 rice",
          price: 300,
          size: "m",
          quantity: 2,
        },
      ],
    };
    const response = await supertest(app)
      .post("/orders")
      .set("Authorization", `Bearer ${TEST_TOKEN}`) // authorization
      .send(body);
    expect(response.status).toBe(201);
    expect(response.body.order.items[0].name).toBe("iya yusuf pizza");
  });
  // TEST GETORDER ROUTE

  it("GET /orders?id", async () => {
    console.log("TEST");
    const response = await supertest(app)
      .get(`/orders/${order._id}`)
      .set("Authorization", `Bearer ${TEST_TOKEN}`); // authorization
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.order.state).toBe(1);
  });
  // TEST DELETE ROUTE
  it("DELETE /orders/:orderId", async () => {
    const response = await supertest(app)
      .delete(`/orders/${order._id}`)
      .set("Authorization", `Bearer ${TEST_TOKEN}`); // authorization
    expect(response.status).toBe(204);
    // expect(response.body.state).toBe(1);
  });
});
