const express = require("express");
const userModel = require("../models/userModel");

const userRoute = express.Router();

// userRoute.put("/:id", async (req, res) => {
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }
//   try {
//     const updateUser = await userModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updateUser);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = userRoute;
