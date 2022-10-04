const express = require("express");
const request = require("supertest");
const orderRoute = require("../routes/orderRoute");

const app = express();

app.use(express.json());

app.use("/orders", orderRoute);

describe("orders API", () => {

    it("GET /orders --> failure when not authenticated", async () => {
        const { body, statusCode } = await request(app).get("/orders")
        expect(body).toEqual(
            expect.objectContaining({
                status: false,
                message: "Please provide username and password in the Authorization header"
            })
        );
        expect(statusCode).toBe(404)
      });

  it("GET /orders --> return an array of orders", async () => {
    const { body, statusCode } = await request(app).get("/orders")
    .set('Authorization', 'basic'+ Buffer.from('admin:password').toString('base64'))
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          created_at: expect.any(Date),
          state: expect.any(Number),
          total_price: expect.any(Number),
          items: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              price: expect.any(Number),
              size: expect.any(String),
              quantity: expect.any(Number),
            }),
          ]),
        }),
      ])
    );
    expect(statusCode).toBe(200)
  });

  it("POST /orders --> add an order to list and return the added order", async() => {
    const {body, statusCode} = await request(app).post('/orders')
    .set('Authorization', 'basic'+ Buffer.from('admin:password').toString('base64'))
    .send({
      "items":[{
        "name": "pepperoni",
        "price": 50,
        "size": "m",
        "quantity": 2
      },{
        "name": "gizdodo",
        "price": 40,
        "size": "l",
        "quantity": 1
      }]
  })

    expect(body).toEqual(
      expect.objectContaining({
        status: true,
        order: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              price: expect.any(Number),
              size: expect.any(String),
              quantity: expect.any(Number)
            })
          ]),
          created_at: expect.any(Date),
          total_price: 90
        })
      })
    )

    expect(statusCode).toBe(201)

  });

  it("GET /orders/orderId --> return a particular orderID", () => {});

  it("PATCH /orders/Id --> update the state of orderID and return orderID ", () => {});

  it("DELETE /orders/orderId --> remove orderId from list", () => {});
});
