const app = require('../../index');
const setupDbForTesting = require('../config/setupDb');
const request = require('supertest').agent(app);

setupDbForTesting();

describe('POST /user', () => {  
  it('should not accept wrong user_type', async () => {
    const response = await request.post('/user').send({
      username: 'test',
      password: 'test',
      user_type: 'master',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', false);
  });

  it('should not accept more fields', async () => {
    const response = await request.post('/user').send({
      username: 'test',
      password: 'test',
      user_type: 'admin',
      hello: 'world',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', false);
  });

  it('should create a user', async () => {
    const response = await request.post('/user').send({
      username: 'test',
      password: 'test',
      user_type: 'admin',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created');
    expect(response.body).toHaveProperty('status', true);
  });
});

describe('GET /user', () => {
  it('respond with authenticated user', async () => {
    const base64 = Buffer.from('test:test').toString('base64');
    const response = await request.get('/user').set('Authorization', `Basic ${base64}`);
    expect(response.status).toBe(200);
    expect(response.body.user).toBeInstanceOf(Object);
    expect(response.body.user).toHaveProperty('username', 'test');
  });
});