const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();


beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27.017');
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /pizza/orders", () => {
    it("should return all orders", async () => {
      const response = await request(app).get("/pizza/orders");
        expect(response.status).toBe(true);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("total_price");
        expect(response.body[0]).toHaveProperty("created_at");
        expect(response.body[0]).toHaveProperty("state");
    });
  }); 


// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });
describe("GET /pizza/order/:orderId", () => {
    it("should return an order", async () => {
      const res = await request(app).get(
        "/pizza/order/:orderId/633a04cc0672e9f8e894a167"
      );
    //   expect(res.statusCode).toBe(200);
      expect(res.body.total_price).toBe(9000);
    });
  });
afterEach(async () => {
    await mongoose.connection.close();
});


// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });
// describe("POST /pizza/order", () => {
//     it("should create an order", async () => {
//       const res = await request(app).post("/pizza/order").send({
//         name: "SugarPepper",
//         price: 1000,
//         size: "m",
//         quantity: 2
//       });
//     //   expect(res.statusCode).toBe(201);
//       expect(res.body.name).toBe("SugarPepper");
//       expect(res.body.size).toBe("m");
//     });
//   });
// afterEach(async () => {
//     await mongoose.connection.close();
// });
  

// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });
// describe("PATCH /pizza/order/:id", () => {
//     it("should update the state of an order", async () => {
//       const res = await request(app).patch(
//         "/pizza/order/633a04cc0672e9f8e894a167")
//         .send({
//           state: 2,
//         });
//     //   expect(res.statusCode).toBe(200);
//       expect(res.body.state).toBe(parseInt(2));
//     });
//   });
// afterEach(async () => {
//     await mongoose.connection.close();
// }); 


// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });
describe("DELETE /pizza/order/:id", () => {
    it("should delete an order", async () => {
      const res = await request(app).delete(
        "/pizza/order/633a0b024852ca1208a418ad"
      );
      expect(res.statusCode).toBe(200);
    });
  });
afterEach(async () => {
    await mongoose.connection.close();
}); 


// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });
// describe("POST /signup", () => {
//     it("should register and log in a new user", async () => {
//       const res = await request(app).post("/signup").send({
//         username: "Sugarpipe",
//         password: "yhuoo",
//       });
//     //   expect(res.statusCode).toBe(200);
//     //   expect(res.token).toBe(token);
//       expect(res.message).toBe("Signup successful");
//     });
//   });
// afterEach(async () => {
//     await mongoose.connection.close();
// }); 


// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });
describe("POST /login", () => {
    it("should log in an existing user", async () => {
      const res = await request(app).post("/login").send({
        username: "Bolutiffe",
        password: "pakswd",
      });
      expect(res.message).toBe("Logged in Successfully");
    //   expect(res.statusCode).toBe(200);
    //   expect(res.token).toBe(token);
    });
  });
// afterEach(async () => {
//     await mongoose.connection.close();
// }); 