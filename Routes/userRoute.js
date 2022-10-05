const moment = require("moment");
const express = require("express");
const userModel = require("../models/userModel");
const authenticateDetails = require('../basicAuthentication')

const userRouter = express.Router()


userRouter.post("/", async (req, res) => {
  
    body= req.body
   
     const user = await userModel.create({
       username: body.username,
       password: body.password,
       user_type: body.user_type,
       created_at: moment().toDate(),
     });
   
     return res.json({ status: true, user });
   });
   
   
   module.exports=userRouter