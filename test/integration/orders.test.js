const supertest = require('supertest');
const app = require('../../index');
const mongoose = require('mongoose');
const requestWithSupertest = supertest(app);
const { validateState, validateQueryResult, validatePagination } = require('../../src/utils/orders/tests');
require('dotenv').config();


let userCredential;
let adminCrendential;


//Get user credential for basicAuth
beforeAll(() => {
    userCredential = Buffer.from(`${process.env.USER_USERNAME}:${process.env.USER_PASSWORD}`).toString('base64');
    adminCrendential = Buffer.from(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`).toString('base64');
})


//Connecting to database before each test
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URI);
  });


//Disconnect from the database after each test
afterEach(async () => {
    await mongoose.connection.close();
});





describe('Order Endpoints', () => {

    it('POST /orders should create a new order record using orderDetails', async () => {
        const orderDetails = {
            "items": [
                {
                  "name": "Chicken Suya",
                  "price": 12.45,
                  "size": "s",
                  "quantity": 2
                },
                {
                  "name": "Chiken Supreme",
                  "price": 40.55,
                  "size": "m",
                  "quantity": 1
                }
              ]
        };
        const totalPrice = orderDetails.items.reduce((prev, curr) => {
            prev += curr.price;
            return prev;
        }, 0);

        const response = await requestWithSupertest.post('/orders').set("Authorization", `Basic ${userCredential}`).send(orderDetails);      
        
        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.order.total_price).toEqual(totalPrice);
    });

    
    it('GET /orders/:orderId should return record with the specified ID', async () => {
        const orderId = '633da45072973af6395436f6';

        const response = await requestWithSupertest.get(`/orders/${orderId}`).set("Authorization", `Basic ${adminCrendential}`);      
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.order['_id']).toBe(orderId);
    });


    it('PATCH /orders/:orderId should update the state property of the record whose ID is specified', async () => {
        const updateInfo = {
            "state": 2
        };
        
        const orderId = '633da4adccc0dcaf1b2c54e1'
        
        const response = await requestWithSupertest.patch(`/orders/${orderId}`).set("Authorization", `Basic ${adminCrendential}`).send(updateInfo);      
        
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.updatedOrder.state).toEqual(updateInfo.state);
    });


    it('DELETE /orders/:orderId should delete record whose ID is specified', async () => {
        
        const orderId = '633da4fc77dace72a5dce6b8'
        
        const response = await requestWithSupertest.delete(`/orders/${orderId}`).set("Authorization", `Basic ${adminCrendential}`);      
        
        if (response.body.status == true) {
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.order.acknowledged).toBe(true);
        } else {
            expect(response.status).toBe(404);
            expect(response.body.status).toBe(false);
            expect(response.body.message.acknowledged).toBe('Record does not exit.');
        }

    });


    it('GET /orders should add pagination, sort by total_price in ASC', async () => {

        const queryParams = {
            state: 1,
            orderBy: "total_price", 
            sortBy: ""     
        };
        
        const response = await requestWithSupertest.get('/orders').query(queryParams).set("Authorization", `Basic ${adminCrendential}`);      

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(validateState(response.body.orders, queryParams)).toBe(true); //Validate state
        expect(validateQueryResult(response.body.orders, queryParams.orderBy, queryParams.sortBy)); //Validate query result
        expect(validatePagination(response.body.orders)).toBe(true); //Validate pagination
    });


    it('GET /orders should add pagination, sort by total_price in DESC', async () => {

        const queryParams = {
            state: 1,
            orderBy: "total_price", 
            sortBy: "desc"     
        };
        
        const response = await requestWithSupertest.get('/orders').query(queryParams).set("Authorization", `Basic ${adminCrendential}`);      

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(validateState(response.body.orders, queryParams)).toBe(true); //Validate state
        expect(validateQueryResult(response.body.orders, queryParams.orderBy, queryParams.sortBy)); //Validate query result
        expect(validatePagination(response.body.orders)).toBe(true); //Validate pagination
    });


    it('GET /orders should add pagination, sort by created_at in ASC', async () => {

        const queryParams = {
            state: 1,
            orderBy: "created_at", 
            sortBy: ""     
        };
        
        const response = await requestWithSupertest.get('/orders').query(queryParams).set("Authorization", `Basic ${adminCrendential}`);      

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(validateState(response.body.orders, queryParams)).toBe(true); //Validate state
        expect(validateQueryResult(response.body.orders, queryParams.orderBy, queryParams.sortBy)); //Validate query result
        expect(validatePagination(response.body.orders)).toBe(true); //Validate pagination
    });

    
    it('GET /orders should add pagination, sort by created_at in DESC', async () => {

        const queryParams = {
            state: 1,
            orderBy: "created_at", 
            sortBy: "desc"     
        };
        
        const response = await requestWithSupertest.get('/orders').query(queryParams).set("Authorization", `Basic ${adminCrendential}`);      

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(validateState(response.body.orders, queryParams)).toBe(true); //Validate state
        expect(validateQueryResult(response.body.orders, queryParams.orderBy, queryParams.sortBy)); //Validate query result
        expect(validatePagination(response.body.orders)).toBe(true); //Validate pagination
    });
});