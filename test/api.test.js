const supertest = require("supertest");
const express = require("express");
const { orderRouter } = require("../routes/order");
const mongoose = require("mongoose")
const { userRouter } = require("../routes/users");
const app = express();
require("dotenv").config()

app.use(express.json());
app.use("/orders", orderRouter);
app.use("/users", userRouter);

jest.setTimeout(20000);
beforeAll(async () => {
    mongoose.connect(process.env.CONNECT_URL)
})
describe("order testing", () => {
  it("GET /orders error", async () => {
    const bodyData = {
      id: "",
    };
    const { statusCode, body } = await supertest(app)
      .get("/orders")
      .send(bodyData);
    expect(body).toEqual({
      message: "cant perform operation",
    });
    expect(statusCode).toEqual(404);
  });
  it("GET /orders", async () => {
    const bodyData = {
      id: "632f17633c62ee027849eec9",
    };
    const { body, statusCode } = await supertest(app)
      .get("/orders?limit=4&page=1&state=2")
      .send(bodyData);
    expect(body.orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
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
    expect(statusCode).toEqual(200);
  });
  it("POST /orders error", async () => {
    const bodyData = {
      id: "632f17633c62ee027849eec9",
    };
    const { statusCode } = await supertest(app).post("/orders").send(bodyData);

    expect(statusCode).toEqual(404);
  });
  it("POST /orders", async () => {
    const bodyData = {
      id: "632f17633c62ee027849eec9",
      items: [
        {
          name: "Samsung Z-fold",
          price: 10000000,
          quantity: 3,
          size: "s",
        },
      ],
    };
    const { statusCode, body } = await supertest(app)
      .post("/orders")
      .send(bodyData);

    expect(body.status).toEqual(true);
    expect(body.order).toEqual(
      expect.objectContaining({
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
      })
    );
    expect(statusCode).toEqual(200);
  });
  it("GET /orders/orderid error", async () => {
    const bodyData = {
      id: "",
    };
    const { statusCode } = await supertest(app)
      .get("/orders/632f23264b875fd2ee2c22aa?state=3")
      .send(bodyData);
    expect(statusCode).toEqual(404);
  });
  it("GET /orders", async () => {
    const bodyData = {
      id: "632f17633c62ee027849eec9",
    };
    const { body, statusCode } = await supertest(app)
      .get("/orders/632f23264b875fd2ee2c22aa?state=3")
      .send(bodyData);
    expect(body.status).toEqual(true);
    expect(body.order).toEqual(
      expect.objectContaining({
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
      })
    );
    expect(statusCode).toEqual(200);
  });
  it("PATCH /orders", async () => {
    const bodyData = {
      id: "632f17633c62ee027849eec9",
    };
    const { statusCode, body } = await supertest(app)
      .patch("/orders/632f23264b875fd2ee2c22aa?state=3")
      .send(bodyData);
    expect(body.status).toEqual(true);
    expect(statusCode).toEqual(200);
  });
  it("DELETE /orders", async () => {
    const bodyData = {
      id: "632f17633c62ee027849eec9",
    };
    const { statusCode, body } = await supertest(app)
      .delete("/orders/6333c80a3548e20f0a52ce92?state=3")
      .send(bodyData);
    expect(body.status).toEqual(true);
    expect(statusCode).toEqual(200);
    // console.log(body)
  });
});

describe("testing users routes", () => {
  it("GET /users",async () => {
      const data = {
          "username": "test1@gmail.com",
          "password": "123456"
        }
      const {body,statusCode} = await supertest(app).get("/users").send(data)
      expect(body.user).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String),
          user_type: expect.any(String)
        })
      )
      expect(statusCode).toEqual(200)
  })
  it("GET /users",async () => {
      const data = {
        "username":"test3@gmail.com",
        "password":"123456",
        "firstname": "Munir",
        "lastname": "Abdullahi",
        "user_type": "admin"
      }
      const {body,statusCode} = await supertest(app).post("/users").send(data)
      expect(body.user).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String),
          user_type: expect.any(String)
        })
      )
      expect(statusCode).toEqual(200)
  })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})