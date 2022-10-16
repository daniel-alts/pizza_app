const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../../model/user')

let server
describe('/User', () => {

  beforeEach(() => { server = require('../../index') })

  afterEach(async () => {
    await User.deleteMany({})
    await server.close()
  })

  const url = '/users'

  describe('POST/', () => {

    it('should return a user if response is valid', async () => {

      const body = {username: "boi", password: "123"}

      const res = await supertest(server).post(url).send(body)

      
      expect(res.body.password).toMatch(body.password)
      expect(res.body).toHaveProperty('username')
      expect(res.status).toBe(200)

    })
  })
})
