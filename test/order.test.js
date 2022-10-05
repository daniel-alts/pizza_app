const supertest = require ('supertest');
const app = require('../index')
const mongoose = require('mongoose');
// const OrderRouter = require('../Routes/OrderRoute')

// app.use('/order', OrderRouter) 

const body = {
  "items": [
  {
    "name": "Test 103",
    "price": 100,
    "size": "m",
    "quantity": 2
  },
  {
    "name": "Test 104",
    "price": 100,
    "size": "l",
    "quantity": 1
  }
  ]
}


beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017');
  })
  
  afterEach(async () => {
    await mongoose.connection.close();
  });

describe("Order Route", ()=> {
    it('create new order', async ()=> {
        const response = await supertest(app).post("/order").json(body);
        expect(response.headers["content-type"].split(';')[0]).toBe("application/json")
        // expect(response.body).toHaveProperty('items')
        // expect(response.body.items).toBe('price', 'name', 'quantity')
    })
})