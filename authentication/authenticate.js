const express = require("express")
const fs = require ("fs")
const { connectToMongoDb } = require("./db")
const users = require("./routes/users")
const userModel = require("../models/usersModel")

function authenticate (req, res){
    // we have to use a promise or async method here since we are reading from a Db
    const body = req.body
    const username = body.username
    const password = body.password
    return new Promise ((resolve, reject)=>{
        if (!username && !password){
        //     res.status(404).json({
        //         status: false,
        //         message: "Username and password is required"
        //     })
        reject (" username and password is required!")
        }

        const checkUser = userModel.find()
        .then(
            (user)=>{
                return res.status(200).json({
                    message: user.username === username})
            }
        ).then(
            (user)=>{
                return res.status(200).json({
                    message: user.password === password})
            }
        ).catch(
            (err)=>{
                res.status(404).json({
                    status: false,
                    message: err
                })
            }
        )
        resolve(checkUser)
        }
    )   
}


module.exports = {
    authenticate
}