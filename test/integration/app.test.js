const supertest = require("supertest");
const server = require("../../index");

describe("Order", () => {
  it("should return a response with all the orders", async () => {
   const response = await supertest(server).get("/orders");

    expect(response.status).toBe(200);
  });

//   it("should create an order", async () => {
//     await supertest(server)
//       .post("/order")
//       .send({
//         items: [
//           {
//             name: "suya pepper",
//             quantity: 2,
//             price: 3000,
//             size: "m",
//           },
//           { name: "hot and spicy", quantity: 2, price: 3000, size: "m" },
//         ],
//       })
//       .expect(200)
//       .end(function (err, res) {
//         if (err) {
//           return done(err);
//         }
//         done();
//       });
//   });
});
