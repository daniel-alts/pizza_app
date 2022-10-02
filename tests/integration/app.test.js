const app = require('../../index');
const setupDbForTesting = require('../config/setupDb');
const request = require('supertest').agent(app);

describe('GET /', () => {
  // setupDbForTesting()
  it('respond with hello world', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello world');
  });
})