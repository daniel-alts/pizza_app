const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNDE4NjQyYzdiN2NkYjI3MjBjMWYzNCIsImVtYWlsIjoic2FtbXk0NEBnbWFpbC5jb20ifSwiaWF0IjoxNjY1MjQ0OTU4fQ.4nCkmgpmkJDTCSQL7_lueyJPYL9q05wYzIUONvZuPQo";
const orderId = "6344225bb160c63365136cfe";

// Get all orders
describe("orderRoute", () => {
  it("GET /orders", async () => {
    await request(app)
      .get("/orders")
      .set({ Authorization: "Bearer " + token })
      .expect(200)
      .expect("content-type", /json/);
  });
});

// Get order by id
it("GET /orders/:id", async () => {
  await request(app)
    .get(`/order/${orderId}`)
    .set({ Authorization: "Bearer " + token })
    .expect(200)
    .expect("content-type", /json/);
});

//   Create order
it("POST /order", async () => {
  await request(app)
    .post("/order")
    .set({ Authorization: "Bearer " + token })
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
});

// Update order state
it("PATCH /order/:id", async () => {
  await request(app)
    .patch(`/order/${orderId}`)
    .set({ Authorization: "Bearer " + token })
    .send({
      state: 1,
    })
    .expect(200)
    .expect("content-type", /json/);
});

it("DELETE /order/:id", async () => {
  await request(app)
    .delete(`/order/${orderId}`)
    .set({ Authorization: "Bearer " + token })
    .expect(200)
    .expect("content-type", /json/);
});
