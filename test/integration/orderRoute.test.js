// this local host is for testing, so the testing doesn't affect the data in my database
process.env.MONGODB_URI = "mongodb://localhost:27017/pizza-app-test";

const request = require("supertest");
const app = require("../../index");
const orderModel = require("../../models/orderModel");
const moment = require("moment");

const header = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNDQ5N2E3NzBmNDRkZjE1N2E0MzI3MCIsImVtYWlsIjoiaGVkb25zaXRAZ21haWwuY29tIn0sImlhdCI6MTY2NTQzOTc1NX0.CSaJCb8FMLBnwTnSBfkWkH4ylPlwXKVr_RyU3h1vw5M`,
};

// Clean Up Our Collections
const cleanup = async () => {
  await orderModel.deleteMany();
};

// Get all orders
describe("orderRoute", () => {
  it("GET /orders", async () => {
    await cleanup();
    // create the orders :: Arrange
    // creat order 1
    const order1 = await orderModel.create({
      items: [{ name: "dodo gizzard", price: 7500, size: "l", quantity: 5 }],
      created_at: moment().toDate(),
      state: 1,
      total_price: 7500,
    });
    // create order 2
    const order2 = await orderModel.create({
      items: [
        { name: "chicken periperi", price: 15000, size: "l", quantity: 3 },
      ],
      created_at: moment().toDate(),
      state: 1,
      total_price: 15000,
    });

    const test = await request(app)
      .get("/orders")
      .set(header)
      .expect(200)
      .expect("content-type", /json/);
    console.log(test.body.orders[1]);

    expect(test.body.status).toBe(true);
    expect(test.body.orders[0]._id).toBeDefined();
    expect(order1.items[0].price).toBe(7500);
    expect(order2.items[0].price).toBe(15000);
  });
});

// Get order by id
it.skip("GET /order/:orderId", async () => {
  // Arrange
  // Create the order
  await cleanup();

  const order = await orderModel.create({
    items: [{ name: "dodo gizzard", price: 7500, size: "l", quantity: 5 }],
    created_at: moment().toDate(),
    state: 1,
    total_price: 7500,
  });

  // Act
  const test = await request(app)
    .get(`/order/${order._id}`)
    .set(header)
    .expect(200)
    .expect("content-type", /json/);
  console.log(test.body.order.items[0].name);

  // Assert
  expect(test.body.status).toBe(true);
  expect(test.body.order).toBeDefined();
  expect(order._id.toString()).toBe(test.body.order._id);
  expect(order.items[0].price).toBe(7500);
});

// Create order
it.skip("POST /order", async () => {
  // Arrange
  await cleanup();

  // Act
  const test = await request(app)
    .post("/order")
    .set(header)
    .send({
      items: [
        {
          name: "dodo gizzard",
          price: 15000,
          size: "m",
          quantity: 5,
        },
      ],
    })
    .expect(200)
    .expect("content-type", /json/);

  // Assert
  const order = await orderModel.findById(test.body.order._id);
  expect(test.body.status).toBe(true);
  expect(order._id.toString()).toBe(test.body.order._id);
});

// Update order state
it.skip("PATCH /order/:id", async () => {
  // Arrange
  await cleanup();

  const order = await orderModel.create({
    items: [],
    created_at: moment().toDate(),
    state: 1,
    total_price: 0,
  });

  // Act
  const test = await request(app)
    .patch(`/order/${order._id}`)
    .set(header)
    .send({ state: 3 })
    .expect(200)
    .expect("content-type", /json/);

  // Assert
  expect(test.body.status).toBe(true);
  expect(test.body.order).toBeDefined();
  expect(test.body.order.state).toBe(3);
});

it.skip("DELETE /order/:id", async () => {
  // Arrange
  await cleanup();
  const order = await orderModel.create({
    items: [],
    created_at: moment().toDate(),
    total_price: 0,
  });

  // Act
  const test = await request(app)
    .delete(`/order/${order._id}`)
    .set(header)
    .expect(200)
    .expect("content-type", /json/);

  // Assert
  expect(test.body.status).toBe(true);
  expect(test.body.order).toBeDefined();
  expect(test.body.order.deletedCount).toBe(1);
});
