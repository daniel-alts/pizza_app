const supertest = require('supertest')
const mongoose = require('mongoose')
const Orders = require('../../model/order')
const User = require('../../model/user')

let server
describe('/Order', () => {

  beforeEach(() => { server = require('../../index') })

  afterEach(async () => {
    await Orders.deleteMany({})
    await server.close()
  })


  const url = '/orders'

  describe('POST/', () => {

    let user

    beforeEach(async() => {

      user =  new User({
          username: "boi123",
          password: "jo123"
      })
  
      await user.save()
  })  


    it('should return 401 if user is not authenticated.', async () => {

      const res = await supertest(server).post(`${url}`)
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('msg')
  
    })

    it('should return  order', async () => {

      const config = { username: user.username, password: user.password }
      const body =   {
        total_price: '46',
        items: [{
        name: "pizza_1",
        price: 23,
        size: 'm',
        quantity: 2,}]
      }

      const res = await supertest(server).post(url).send(body).set(config)

      
      expect(res.body.order).toHaveProperty('total_price')
      expect(res.body.status).toBe(true)
      expect(res.status).toBe(200)

    })
  })

  describe('GET/', () => {
    it('should get all orders', async () => {
      const orders = [ 
        {total_price: '46',
        items: [{
          name: "pizza_1",
          price: 23,
          size: 'm',
          quantity: 2,
        }]},

        {total_price: '46',
        items: [{
          name: "pizza_2",
          price: 23,
          size: 'l',
          quantity: 2,
        }]},

      ]

      await Orders.insertMany(orders)
      const res = await supertest(server).get(url)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body).not.toBeNull()
      
    })
  })


  describe('GET/:ID', () => {
    let orderId;
    let order
    let user
    beforeEach(async() => {

    user =  new User({
        username: "boi123",
        password: "jo123"
    })

    await user.save()

    order =  new Orders(
        {total_price: '46',
        items: [{
          name: "pizza_1",
          price: 23,
          size: 'm',
          quantity: 2,
        }]},
      )

      await order.save()

      orderId = order._id
    })

    it('should return 401 if user is not authenticated.', async () => {

      const res = await supertest(server).get(`${url}/${orderId}`)
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('msg')
  
    })

    it('should return 404 if order is not found.', async () => {

      orderId = mongoose.Types.ObjectId()
      const config = {username : user.username, password : user.password}
      const res = await supertest(server).get(`${url}/${orderId}`).set(config)
      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('msg')
  
    })

    it('should return order if a valid id is given.', async () => {

      const config = {username : user.username, password : user.password}
      const res = await supertest(server).get(`${url}/${orderId}`).set(config)

      expect(res.status).toBe(200)
      expect(res.body).not.toBeNull()
      
    })
  })




  


})