const supertest = require('supertest');
const app = require('../../index');

const order = {
  "items": [
    {
      "name": "Chicken Supreme",
      "quantity": 2,
      "price": 1000,
      "size": "m"
    },
    {
      "name": "AltSchool Special",
      "quantity": 3,
      "price": 2500,
      "size": "m"
    }
    ]
}

describe("POST /order", () => {
  it('should return 401 if authentication isn\'nt passed', async () => {
    const response = await supertest(app).post(order)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('not allowed')
  })

  
})
