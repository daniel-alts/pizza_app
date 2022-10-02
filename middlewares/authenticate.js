const express = require("express");
const userModel = require("../model/userModel");
const authenticate = (req, res, next) => {
    const { user } = req.body;
    if (user === "Godsent") {
        req.user = { name: "Godsent", id: 3 };
    } else if (user === "Daniel") {
        req.user = { name: "Daniel", id: 3 };
    } else {
        res.status(401).send("Unauthorized user");
    }
};

module.exports = authenticate;