const supertest = require('supertest');
const app = require('../index');

beforeAll(() => {
  supertest(app)
    .post('/register')
    .send({
      user: {
        username: 'ibraheeem',
        password: '123456',
        user_type: 'admin',
      },
    });
});

describe('accessing orders with auth', () => {
  it('get all orders', async () => {
    const response = await supertest(app)
      .get('/orders')
      .set({ Authorization: 'ibraheem 123456' });

    expect(response.statusCode).toBe(200);
  });

  it('get single order with id', async () => {
    const response = await supertest(app)
      .get('/orders/6339706923734a5407413629')

      .set({ Authorization: 'ibraheem 123456' });

    expect(response.statusCode).toBe(200);
  });

  it('post single order', async () => {
    const response = await supertest(app)
      .post('/orders')
      .set({ Authorization: 'ibraheem 123456' })
      .send({
        items: [
          {
            name: 'Large Cheese And Pepperoni',
            price: 8000,
            size: 'l',
            quantity: 2,
          },
        ],
      });
    expect(response.status).toBe(200);
  });

  it('update single order with id', async () => {
    const response = await supertest(app)
      .put('/orders/632f5d0d55a92cd50d026386')
      .set({ Authorization: 'ibraheem 123456' })
      .send({
        state: 2,
      });

    expect(response.status).toBe(200);
  });

  it('delete single order with id', async () => {
    const response = await supertest(app)
      .delete('/orders/632f45d416cc197dabc9f5bb')
      .set({ Authorization: 'ibraheem 123456' });
    expect(response.status).toBe(200);
  });
});
