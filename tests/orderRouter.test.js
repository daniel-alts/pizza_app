const express = require('express');
const request = require('supertest');
const { router: orderRouter } = require('../controller/router/orderRouter');

/* 
OUTCOME OF THE TEST:
  The outcome of the first phase of this test did not come out nice at all. :(  And it shows that I have a lot to learn with respect to testing. 

  Furthermore, I learnt that testing is done progressively, as the code is developed. And not just after the code is completed. 
  
  So , my plan was to start writing tests for this "project" at the initial phase. And continue to modify my tests as I develop the Pizza app. But alas, I have to put this approach on hold.
    
  I am interested in learning backend development. And I will learn it. However, I'm seriously running out of time with this assignment. So, I will move on to another aspect of this assignment. 
  
  If I am able to finish other aspects of the assignment and I still have time, I will continue with the test.
 */

const app = express();

// Middlewares
app.use(express.json());
app.use('/order', orderRouter);

// INTEGRATION TESTS FOR THE ORDER ROUTER:

// 1. Successful get-all request

// test('description', () => {  expect().toBe()  });
// const {} = request().get();

test('successfully reads all documents in the orders collection', async () => {
  const { statusCode, body } = await request(app).get('/order');
  expect(statusCode).toBe(200);
  expect(body).toEqual(
    expect.objectContaining({
      status: Boolean,
      orders: expect.ArrayContaining([
        {
          _id: expect.any(String),
          created_at: expect.any(String),
          state: expect.any(Number),
          total_price: expect.any(Number),
          items: expect.ArrayContaining([
            {
              name: expect.any(String),
              price: expect.any(Number),
              size: expect.any(String),
              quantity: expect.any(Number),
              _id: expect.any(String),
            },
          ]),
          __v: 0,
        },
      ]),
    })
  );
});

// 2. Invalid get-all request ???

// THE END! ;-)
