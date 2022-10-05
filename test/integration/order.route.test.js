const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment')
const Order = require('../../model/orderModel')

const app = require('../../app')


let auth = 'wendy:12345'

describe('Order Route', () => {

// ***********CONNECT DATABASE ****************/
    beforeAll(()=>{
        mongoose.connect('mongodb://localhost:27017')
    });

//********************TEST FOR ENDPOINTS IN ORDERS ROUTES***************/
test(" /orders", async() => {

    // ************* POST REQUEST *****************/
    const body = {
        "status":1,
        "items": [{
            "name":"pizza", "price":2500, "size":"m", "quantity":3
        }]
    }

    const total_price = body.items.reduce((prev, curr) => {
       
        prev += (curr.price * curr.quantity)
        return prev
    }, 0);

    const order = await Order.create({
        items: body.items,
        created_at: moment().format('MM/DD/YYYY'),
        total_price
    })
    order.save()
    
   await request(app).post('api/orders/')
    .set({Authorization : 'Basic ' + auth})
    .send(order)
   
   
    .expect((res) => {
        res.body.status = body.status;
        res.statusCode = 201
        res.headers["content-type"] = 'application/json';
    })
    
// **************** GET REQUEST *********************/ 

    await request(app).get('/api/orders')
    .set({Authorization : 'Basic ' + auth})
    .expect('Content-Type', /json/)
    .expect(200)

// *************** GET BY ID REQUEST ****************/

    await request(app).get('/api/orders/'+ order._id)
    .set({Authorization : 'Basic ' + auth})
    .expect('Content-Type', /json/)
    .expect(200)
    

// *************** PATCH REQUEST ****************/

    await request(app).patch('/api/orders/'+ order._id)
        .set({Authorization : 'Basic ' + auth})
        .expect('Content-Type', /json/)
        .send({
            "state":2})
        .expect(200)
  
})


// ***************CLOSE DB CONNECTION AFTER OPERATION ***********/
    afterAll((done) =>{
        mongoose.disconnect(done)
    })
    
        
})