const supertest = require('supertest');
const app = require('../../index');

describe('Users CRUD Operations', () => {
  it('GET /api/users: Responds with json', async () => {
    const response = await supertest(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(response.body.users.length);
  });
  it('POST /api/users: Responds with json', async () => {
    const response = await supertest(app).post('/api/auth/signup').send({
      username: 'Ebube',
      password: 'ebube',
      email: 'ebube@gmail.com',
      user_type: 'admin',
    });
    expect(response.statusCode).toBe(201);
    expect(Object.keys(response.body).length).toBe(3);
  });

  it('GET /api/users/:userId: Responds with json', async () => {
    const response = await supertest(app).get(
      '/api/users/634ac75b00f167a1fb0ac416'
    );
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body).length).toBe(8);
  });
  it('PATCH /api/users/:userId Responds with json', async () => {
    const response = await supertest(app)
      .patch('/api/users/634ac75b00f167a1fb0ac416')
      .send({
        username: 'Chikadibia Ebube',
      });
    expect(response.statusCode).toBe(204);
  });
  it('DELETE /api/users/:userId - Deletes a user and responds with json', async () => {
    const response = await supertest(app).delete(
      '/api/users/634ac75b00f167a1fb0ac416'
    );
    expect(response.statusCode).toBe(200);
  });
});

describe('Orders CRUD Operations', () => {
  it('GET /api/orders: Responds with json', async () => {
    const response = await supertest(app).get(
      '/api/orders/?jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ5ZTBjMjMzNjI1MTA1YzlmZDUxMjciLCJ1c2VybmFtZSI6ImRhcmtjb2RlX18iLCJlbWFpbCI6ImRhcmtjb2RlQGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjY1Nzg2MDUwfQ.K7SUKNar--BY5Yyj6qtsnFjX1XXZenJPhGfOo-JxJrk'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.order.orders.length).toBe(
      response.body.order.orders.length
    );
  });
  it('POST /api/orders: Responds with json', async () => {
    const response = await supertest(app)
      .post(
        '/api/orders/?jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ5ZTBjMjMzNjI1MTA1YzlmZDUxMjciLCJ1c2VybmFtZSI6ImRhcmtjb2RlX18iLCJlbWFpbCI6ImRhcmtjb2RlQGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjY1Nzg2MDUwfQ.K7SUKNar--BY5Yyj6qtsnFjX1XXZenJPhGfOo-JxJrk'
      )
      .send({
        state: 11,
        items: [
          {
            name: 'Trousers',
            price: 40,
            size: 'm',
            quantity: 8,
          },
          {
            name: 'Jeans',
            price: 15,
            size: 'l',
            quantity: 8,
          },
          {
            name: 'Pans',
            price: 7,
            size: 'm',
            quantity: 15,
          },
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(Object.keys(response.body).length).toBe(2);
  });

  it('GET /api/orders/:orderId: Responds with json', async () => {
    const response = await supertest(app).get(
      '/api/orders/6349dead0563544f633a145c/?jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ5ZTBjMjMzNjI1MTA1YzlmZDUxMjciLCJ1c2VybmFtZSI6ImRhcmtjb2RlX18iLCJlbWFpbCI6ImRhcmtjb2RlQGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjY1Nzg2MDUwfQ.K7SUKNar--BY5Yyj6qtsnFjX1XXZenJPhGfOo-JxJrk'
    );
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body).length).toBe(2);
  });
  it('PATCH /api/orders/:orderId Responds with json', async () => {
    const response = await supertest(app)
      .patch(
        '/api/users/6349dead0563544f633a145c/?jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ5ZTBjMjMzNjI1MTA1YzlmZDUxMjciLCJ1c2VybmFtZSI6ImRhcmtjb2RlX18iLCJlbWFpbCI6ImRhcmtjb2RlQGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjY1Nzg2MDUwfQ.K7SUKNar--BY5Yyj6qtsnFjX1XXZenJPhGfOo-JxJrk'
      )
      .send({
        state: 22,
      });
    expect(response.statusCode).toBe(204);
  });
  it('DELETE /api/orders/:orderId - Deletes order and responds with json', async () => {
    const response = await supertest(app).delete(
      '/api/orders/6349dead0563544f633a145c/?jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ5ZTBjMjMzNjI1MTA1YzlmZDUxMjciLCJ1c2VybmFtZSI6ImRhcmtjb2RlX18iLCJlbWFpbCI6ImRhcmtjb2RlQGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjY1Nzg2MDUwfQ.K7SUKNar--BY5Yyj6qtsnFjX1XXZenJPhGfOo-JxJrk'
    );
    expect(response.statusCode).toBe(200);
  });
});
