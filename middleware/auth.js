const express = require("express");
const userModels = require("../model/userModel");

const users = [];
async function getAllUsers() {
  const userFromDb = await userModels.find();
  return userFromDb;
}

async function userAuth(req, res, next) {
  users = await getAllUsers();
}
