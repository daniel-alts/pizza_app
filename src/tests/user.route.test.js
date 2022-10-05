const supertest = require('supertest');
const mongoose = require('mongoose');

const server = require('../index');

describe('/POST Register ', () => {
  it('is expected to create a user', async () => {
    let user = {
      username: 'Ayooluwa Adeleke',
      password: 'password',
      user_type: 'user',
      email: 'ayoluwadeleke@gmail.com',
      website: 'www.ayoluwadeleke.com',
    };

    const response = (await supertest(server).post('/api/user/create')).send(
      user
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(user);
    expect(response.msg).toHaveProperty(
      'Endeavour successful! You have just registered...'
    );
  });
});
