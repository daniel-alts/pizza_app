// const supertest = require("supertest");
// const server = require("../app");
// describe("orders route", () => {
//   it("GET /orders", async () => {
//     const response = await supertest(server).get("/orders");
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(3);
//   });

//   it("GET /orders?id", async () => {
//     const response = await supertest(server).get(
//       "/users?_id=6334602d3bd635fb9d976dc0"
//     );
//     expect(response.status).toBe(200);
//     expect(response.body.state).toBe(1);
//   });

//   it("POST /orders", async () => {
//     {
//       "items"[
//         ({
//           name: "KFC pizza",
//           price: 20,
//           size: "m",
//           quantity: 5,
//         },
//         {
//           name: "Dominino's pizza",
//           price: 40,
//           size: "m",
//           quantity: 2,
//         })
//       ];
//     }

//     const response = await supertest(server).post("/orders");
//     expect(response.status).toBe(500);
//     expect(response.body.item.name).toBe("KFC pizza,Dominino's pizza");
//   });

//   it("DELETE /users", async () => {
//     const response = await supertest(server).post(
//       "/users?_id=633460133bd635fb9d976dbd"
//     );
//     expect(response.status).toBe(500);
//     expect(response.body.item.name).toBe("fried beans");
//   });
// });
