const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

let userAuth = "Ada:123456789";
const orderId = "6342d877b7ec40cddb903419";

// Get all orders
describe("orderRoute", () => {
  it("GET /orders", async () => {
    await request(app)
      .get("/orders")
      .set({ Authorization: "Basic " + userAuth })
      .expect(200)
      .expect("content-type", /json/);
  });

  // Get order by id
  it("GET /orders/:id", async () => {
    await request(app)
      .get(`/orders/${orderId}`)
      .set({ Authorization: "Basic " + userAuth })
      .expect(200)
      .expect("content-type", /json/);
  });

  // Create order
  // it("POST /orders", async () => {
  //   await request(app)
  //     .post("/orders")
  //     .set({ Authorization: "Basic " + userAuth })
  //     .send({
  //       items: [
  //         {
  //           name: "Pizza",
  //           price: 10,
  //           quantity: 2,
  //         },
  //       ],
  //     })
  //     .expect(201)
  //     .expect("content-type", /json/);
  // });

  // Update order state
  it("PATCH /orders/:id", async () => {
    await request(app)
      .patch(`/orders/${orderId}`)
      .set({ Authorization: "Basic " + userAuth })
      .send({
        state: 1,
      })
      .expect(200)
      .expect("content-type", /json/);
  });

  //Delete order : This test deletes the id used in the previous test (orderId) when run.
  // it("DELETE /orders/:id", async () => {
  //   await request(app)
  //     .delete(`/orders/${orderId}`)
  //     .set({ Authorization: "Basic " + userAuth })
  //     .expect(200)
  //     .expect("content-type", /json/);
  // });
});

afterAll((done) => {
  // Closing the DB connection so as to allow Jest to exit successfully.
  mongoose.connection.close();
  done();
});
