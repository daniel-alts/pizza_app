const express = require("express");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const userModel = require("../model/userModel");

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        let decoded;

        if (authorization) {
            try {
                const token = authorization.split(" ")[1];
                // ["bearer", "token"]
                decoded = jwt.verify(token, process.env.SECRET);
            } catch (error) {
                return res.status(410).json({
                    error: true,
                    message: "Session expired, you have to login.",
                });
            }
            req.decoded = decoded;
            return next();
        }
        return res.status(401).json({
            error: true,
            message: "Sorry, you have to login.",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server Error",
        });
    }
};

module.exports = authenticate;