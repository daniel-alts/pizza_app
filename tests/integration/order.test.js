const app = require('../../index');
const setupDbForTesting = require('../config/setupDb');
const request = require('supertest').agent(app);
const itemFixtures = require('../fixtures/items');

setupDbForTesting();

let Authorization = Buffer.from('test:test').toString('base64');
beforeAll(async () => {
  await request.post('/user').send({
    username: 'test',
    password: 'test',
    user_type: 'admin',
  });
})

describe('POST /user', () => {
  it('should not accept item without price', async () => {
    const response = await request.post('/order')
      .set('Authorization', `Basic ${Authorization}`)
      .send({
        items: [
          { "quantity": 1, "size": "s", "name": "Test" }
        ]
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', false);
  });

  it('should not accept item without quantity', async () => {
    const response = await request.post('/order')
      .set('Authorization', `Basic ${Authorization}`)
        .send({
        items: [
          { "price": 1, "size": "s", "name": "Test" }
        ]
      })
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', false);
  });

  it('should not accept item without name', async () => {
    const response = await request.post('/order')
      .set('Authorization', `Basic ${Authorization}`)
        .send({
        items: [
          { "price": 1, "size": "s", "price": 1 }
        ]
      })
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', false);
  });

  it('should create an order', async () => {
    const response = await request.post('/order')
      .set('Authorization', `Basic ${Authorization}`)
        .send({
        items: [
          { price: 1, quantity: 1, size: "s", name: "One" },
          { price: 2, quantity: 2, size: "s", name: "Two" },
          { price: 3, quantity: 3, size: "s", name: "Three" },
        ]
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('order');
    expect(response.body.order).toHaveProperty('total_price', 14);
    expect(response.body.order).toHaveProperty('items');
    expect(response.body.order.items).toHaveLength(3);
  });
});

const ids = []

describe('GET /order', () => {
  beforeAll(async () => {
    for (const items of itemFixtures) {
      const response = await request.post('/order')
        .set('Authorization', `Basic ${Authorization}`)
        .send({ items });
      ids.push(response.body.order._id);
    }
  });

  it('should return a single order', async () => {
    const response = await request.get(`/order/${ids[0]}`)
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('order');
    expect(response.body.order).toHaveProperty('items');
    expect(response.body.order.items).toHaveLength(itemFixtures[0].length);
  });

  it('should return all orders', async () => {
    const response = await request.get('/order')
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders).toHaveLength(itemFixtures.length + 1);
    expect(response.body).toHaveProperty('total', itemFixtures.length + 1);
  });

  it('should return all orders paginated 3 per page, page 1', async () => {
    const response = await request.get('/order?page=1&limit=3')
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders).toHaveLength(3);
    expect(response.body).toHaveProperty('total', itemFixtures.length + 1);
  });

  it('should return all orders paginated 3 per page, page 2', async () => {
    const response = await request.get('/order?page=2&limit=3')
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders).toHaveLength(3);
    expect(response.body).toHaveProperty('total', itemFixtures.length + 1);
  });

  it('should return all orders paginated 3 per page, page 3', async () => {
    const response = await request.get('/order?page=3&limit=3')
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders).toHaveLength(1);
    expect(response.body).toHaveProperty('total', itemFixtures.length + 1);
  });

  it('should return an empty array - orders paginated 4 per page, page 3', async () => {
    const response = await request.get('/order?page=4&limit=3')
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders).toHaveLength(0);
    expect(response.body).toHaveProperty('total', itemFixtures.length + 1);
  });
});

describe('PATCH /order', () => {
  it('should update an order', async () => {
    const response = await request.patch(`/order/${ids[0]}`)
      .set('Authorization', `Basic ${Authorization}`)
      .send({ state: 2 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('order');
    expect(response.body.order).toHaveProperty('state', 2);
  });
})

describe('DELETE /order', () => {
  it('should delete an order', async () => {
    const response = await request.delete(`/order/${ids[0]}`)
      .set('Authorization', `Basic ${Authorization}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
  });
})