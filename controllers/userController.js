const express = require("express");
const Users = require("../models/userModel");

const user = {};

user.createUser = async (req, res) => {
  const data = req.body;
  try {
    const users = await new Users(data).save();
    res.status(201).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "fail", error });
  }
};



module.exports = user;
