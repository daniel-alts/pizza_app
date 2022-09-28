const express = require("express");
const UserModel = require('../models/userModel')
const moment = require('moment')
const router = express.Router();

router.get("/", (req, res) => {});
router.get("/:userId", (req, res) => {});
router.post("/", (req, res) => {});
router.patch("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
