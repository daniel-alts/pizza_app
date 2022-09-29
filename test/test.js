const app = require('../index');
const supertest = require('supertest');


supertest(app).post('/hello').send({"username": "rwandagloria", "password":"hello"}).expect(200)
.end(function(err, res) {
    if (err) return done(err);
    return done();

});