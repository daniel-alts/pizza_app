const request = require('supertest');

const app = require('../../app')

let auth = 'wendy:12345'
let id = '633b75b2befab172c7964112'

describe('Order Route', () => {
    it("GET /orders", async() => {
        await request(app).get('/api/orders')
        .set({Authorization : 'Basic ' + auth})
        .expect('Content-Type', /json/)
        .expect(200)
        
    })
    
    it("GET /orders/:id", async() => {
        await request(app).get('/api/orders/'+id)
        .set({Authorization : 'Basic ' + auth})
        .expect('Content-Type', /json/)
        .expect(200)
    })



    
    it("POST /orders", async() => {
        await request(app).post('api/orders')
        .set({Authorization : 'Basic ' + auth})
        .send({
            status:1,
            created_at:Date.now(),
            items: [{
                name: "pizza pie", price: 2500, size: "m", quantity:2
            }]
        })
        .expect(201)
    })

    it("PATCH /orders/:id", async() => {
        await request(app).patch('/api/orders/'+id)
        .set({Authorization : 'Basic ' + auth})
        .expect('Content-Type', /json/)
        .send({
            "state":2
        })
        .expect(200)
    })

    it("DELETE /orders/:id", async() => {
        await request(app).delete('/api/orders/'+id)
        .set({Authorization : 'Basic ' + auth})
        .expect('Content-Type', /json/)
        .expect(200)
    })
        
})