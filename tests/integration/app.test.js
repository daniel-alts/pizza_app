const app = require('../../app');
const request = require('supertest').agent(app);

describe('GET /', () => {
  it('respond with hello world', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello World!');
  });
})