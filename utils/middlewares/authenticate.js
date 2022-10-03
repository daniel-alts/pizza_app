const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../middlewares/utils/userModel");

const authenticate = async (req, res, next) => {
  const authHeaders = req.header.authorization;
  if (!authHeaders) {
    return res.status(404).json({ status: "forbidden" });
  }

  const encoded = authHeaders.substring(6);
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  const [name, password] = decoded.split(":");

  const authUser = await userModel.findOne({ username: name });

  if (!authUser) {
    return res.status(404).json({ status: "forbidden" });
  }

  const passwordMatch = await bcrypt.compare(password, authUser.password);

  if (!passwordMatch) {
    return res.status(404).json({ status: "forbidden" });
  }

  next();
};

module.exports = authenticate;
