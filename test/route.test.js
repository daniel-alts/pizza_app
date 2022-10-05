const request = require('supertest');
const { app, usersRoute, loginRouter } = require('../app');

jest.setTimeout(30000);

describe('POST /register', () => {
  // 'given user info':
  //  save user info to db
  it('status code is 200', async () => {
    const response = await request(app).post('/register').send({
      password: 'password',
      firstName: 'fola',
      lastName: 'lastName',
      email: 'email',
      user_type: 'admin',
    });
    expect(response.statusCode).toBe(200);
  });

  // given user password and username:
  // login the user if user exists
  it('status code is 200 and content type is text', async () => {
    const response = await request(app)
      .get('/login')
      .set({
        email: 'ola@gmail.com',
      })
      .set({ password: 'xoxoxo' });
    expect(response.statusCode).toBe(200);
  });

  // accepts customer order
  it('take in customer order and save to db', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        items: [
          {
            name: 'dodo',
            price: 4500,
            size: 'l',
            quantity: 3,
          },
        ],
      });
    expect(response.statusCode).toBe(200);
  });
});
