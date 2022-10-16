const supertest = require('supertest');
const app = require("../../index");


describe('Tests for Order Route', () => {

  it('GET /order/:id Works', async () => {
    
    const validUser = {
      "user": {
        "username": "Mike",
        "password": "123456"
      }
    }
    const response = await supertest(app).get("/order/634bce00379bdab95189e810").send(validUser)
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.status).toBe(200)
  });


  it('GET /orders Works to get all orders', async () => {
    
    const validUser = {
      "user": {
        "username": "Mike",
        "password": "123456"
      }
    }
    const response = await supertest(app).get("/orders").send(validUser)
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.status).toBe(200)
  });


  // it('POST /order', async () => {
    
  //   const validUser = {
  //     "user": {
  //       "username": "Mike",
  //       "password": "123456"
  //     },
      
  //     "order": {
  //       "items" : [{
  //         "name" : "Chicken Pizza",
  //         "price" : 20000,
  //         "size" : "s",
  //         "quantity" : 5
  //       }, {
  //         "name" : "Chicken and beef",
  //         "price" : 9000,
  //         "size" : "m",
  //         "quantity" : 2
  //       }]
  //     }
  //   }
  //   const response = await supertest(app).post("/order").send(validUser)
  //   expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  //   expect(response.status).toBe(200)
  // });

  // it('PATCH /order/:id Works', async () => {
    
  //   const validUser = {
  //     "user": {
  //       "username": "Mike",
  //       "password": "123456"
  //     },
      
  //     "order": {
  //       "items" : [{
  //         "name" : "Chicken Pizza",
  //         "price" : 20000,
  //         "size" : "s",
  //         "quantity" : 5
  //       }, {
  //         "name" : "Chicken and beef",
  //         "price" : 9000,
  //         "size" : "m",
  //         "quantity" : 2
  //       }]
  //     }
  //   }
  //   const response = await supertest(app).patch("/order/634bce00379bdab95189e810").send(validUser)
  //   expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  //   expect(response.status).toBe(200)
  // });

  // it('DELETE /order/:id Works', async () => {
    
  //   const validUser = {
  //     "user": {
  //       "username": "Mike",
  //       "password": "123456"
  //     }
  //   }
  //   const response = await supertest(app).delete("/order/634bd585f9d01101998651a5").send(validUser)
  //   expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  //   expect(response.status).toBe(200)
  // });


});