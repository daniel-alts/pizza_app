const supertest = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai');

const server = require('../index');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/GET orders', () => {
  it('should return all orders', async () => {
    const response = await supertest(server).get('/api/orders');
    expect(response.headers['authorization']).toBe(
      'Alt School Basic Authentication'
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
});
describe('/POST Create order', () => {
  it('is expected to create a single order', async () => {
    let item = [
      {
        name: 'Nigerian made Leather Jacket',
        price: '2500',
        size: 'm',
        quantity: 3,
      },
    ];
    const response = (await supertest(server).post('/api/order/create')).send(
      item
    );
    expect(response.headers['authorization']).toBe(
      'Alt School Basic Authentication Strategy'
    );
    expect(response.status).toBe(200);
    expect(response.body.item.name).toBe('Leather Jacket');
    expect(response.body.item.price).toBe(2500);
    expect(response.body.item.size).toBe('m');
    expect(response.body).toHaveProperty('status', true);
    expect(response.body.item.quantity).toBe(3);
  });
});
describe('/GET get one order', () => {
  it('should return a particular order', async () => {
    const response = await supertest(server).get(`/api/order/${id}`);
    expect(response.headers['authorization']).toBe(
      'Alt School Basic Authentication Strategy'
    );
    expect(response.status).toBe(200);
    expect(response.body.item.name).toBe('Nigerian made Leather Jacket');
  });
});

describe('/PATCH update one order', () => {
  it('should update a single order', async () => {
    const response = await supertest(server)
      .patch(`/api/order/${id}`)
      .send({ state: 2 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('order');
    expect(response.body.order).toHaveProperty('state', 2);
  });
});
describe('/DELETE delete one order', () => {
  it('should totally delete a single order', async () => {
    const response = await supertest(server).delete(`/api/order/${id}"`);
    expect(response.headers['authorization']).toBe(
      'Alt School Basic Authentication Strategy'
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order now deleted');
  });
});
