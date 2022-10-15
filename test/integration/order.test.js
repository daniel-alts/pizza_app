const supertest = require('supertest');
const app = require('../../index');

describe('Order Route', () => {
  it('should get all /orders', async () => {
    const response = await supertest(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body.orders.length).toBe(6);
  });

  it('should get an /order', async () => {
    const response = await supertest(app).get(
      '/orders/6336e9f3746eb01167d5d8eb'
    );
    expect(response.status).toBe(200);
    expect(response.body.order.items[0].name).toBe('McPlaren');
    expect(response.body.order.items.length).toBe(3);
  });

  it('should create an /order', async () => {
    const order = {
      username: 'Patrick Schaum',
      password: 'cing67',
      items: [
        {
          name: 'LG Air conditioner',
          price: 650,
          size: 'l',
          quantity: 2,
        },
      ],
    };
    const response = await supertest(app).post('/orders').send(order);
    expect(response.status).toBe(200);
    expect(response.body.order.items[0].name).toBe('LG Air conditioner');
    expect(response.body.order.items[0].quantity).toBe(2);
  });

  it('should update an /order', async () => {
    const updatedOrder = {
      state: 35,
    };
    const response = await supertest(app)
      .patch('/orders/632ef2f6eba99e5bc5e60a62')
      .send(updatedOrder);
    expect(response.status).toBe(200);
    expect(response.body.order.state).toBe(35);
  });

  it('should delete an order', async () => {
    const user = {
      username: 'Zeuhz Droid',
      password: 'gridz09',
    };
    const response = await supertest(app)
      .delete('/orders/6336f4bce897a8fa1988706b')
      .send(user);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('order deleted');

    const response2 = await supertest(app).get('/orders');
    expect(response2.status).toBe(200);
    expect(response2.body.orders.length).toBe(6);
  });
});

afterAll(() => {
  console.log('it worked');
});
