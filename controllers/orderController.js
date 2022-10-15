const express = require("express")
const moment = require('moment');
const orderModel = require('../models/orderModel')
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//const authenticatedUser  = require("../middleware/auth")

exports.createOrder =  async(req, res) => {
  try{
     
      const body = req.body;

      const total_price = body.items.reduce((prev, curr) => {
          prev += curr.price * curr.quantity;
         // prev += curr.price * curr.quantity;
          return prev;
      }, 0)
      const order = await orderModel.create({ 
          items: body.items,
          created_at: moment().toDate(),
          total_price
      })
      await order.save()
      return res.json({ status: true, order })
  } catch (error) {
      res.json({
          status: false,
          message: error
      })
  }

}

exports.getaSingleOrder = async (req, res) => {
  try {
      const authenticatedUser = req.authenticatedUser
      // 
          if (authenticatedUser) {
            return res.status(200)
          }
      const { orderId } = req.params;
      const order = await orderModel.findById(orderId)
  
      if (!order) {
          return res.status(404).json({ status: false, order: null })
      }
  
      return res.json({ status: true, order })
  } catch(error) {
      res.json({
          status: false,
          message: error
      })
  }
}

exports.getAllOrder =  async (req, res) => {
  try {
      // check for authenticated user
  const authenticatedUser = req.authenticatedUser
// 
  if (authenticatedUser) {
    return res.status(200)
  }

 // let orders

      const { state, sort } = req.query
      const queryObject = {}

      if(state) {
          queryObject.state = state
      }
//  const orders = await orderModel.find()

  if(sort) {
      res.json(sort)
  }

  
//sorting,querying and pagination
let query = {};
//  const { state } = req.query;
if (state) {
  query = { state };
}

const { created_at } = req.query;
const { total_price } = req.query;
const { limit } = req.query;


let totalPrice = {};
let createdAt = {};
let limitOrders = {};

if (created_at === "asc") {
  createdAt = { created_at: 1 };
} else if (created_at === "desc") {
  createdAt = { created_at: -1 };
}
if (!created_at) {
  createdAt = {};
}

if (total_price === "asc") {
  totalPrice = { total_price: 1 };
} else if (total_price === "desc") {
  totalPrice = { total_price: -1 };
}
if (!total_price) {
  totalPrice = {};
}

if (limit) {
  limitOrders = { limit: parseInt(limit) };
}
if (!limit) {
  limitOrders = {};
}


const orders = await orderModel.find(query).sort(totalPrice).sort(createdAt).limit(limitOrders.limit);
  return res.json({ status: true, orders });

 
  } catch (error){
      console.log(error)
      res.json({
          status: false,
          message: error
      })
  } 
}


exports.updateOrder = async (req, res) => {
  try{
      const authenticatedUser = req.authenticatedUser
      // 
          if (authenticatedUser) {
            return res.status(200)
          }  
      const { id } = req.params;
      const { state } = req.body;
  
      const order = await orderModel.findById(id)
  
      if (!order) {
          return res.status(404).json({ status: false, order: null })
      }
  
      if (state < order.state) {
          return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
      }
  
      order.state = state;
  
      await order.save()
  
      return res.json({ status: true, order })
  } catch (error) {
      res.json({
          status: false,
          message: error
,
      })
  }
}

exports.cancelOrder=  async (req, res) => {
  try {
      
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id})

  return res.json({ status: true, order })
 } catch (error) {
  res.json({
      status: false,
      message: error
  })
 }
}
