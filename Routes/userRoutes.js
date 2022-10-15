const express = require("express");
const router = express.Router();
const userModel = require("./../Schema/userSchema");
const APIFeatures = require("./../utilis/APIfeatures");
const authUser = require("./../utilis/authUser");

router
  .route("/")
  .get(async (req, res) => {
    try {
      await authUser(req, res, ["admin"]);
      console.log(req.query);
      const features = new APIFeatures(userModel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const users = await features.query;
      return res.status(200).json({ status: true, users });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const user = userModel.create(req.body);
      return res.status(201).json({ status: true, user });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      await authUser(req, res, ["admin", "user"]);
      const user = await userModel.findById(req.params.id);
      if (!user) throw Error;
      return res.status(201).json({ status: true, user });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      await authUser(req, res, ["admin", "user"]);
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body.updateData,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) throw Error;
      return res.status(201).json({ status: true, user });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      await authUser(req, res, ["admin"]);
      const user = await userModel.findByIdAndDelete(req.params.id);
      return res.status(201).json({ status: true, user });
    } catch (err) {
      res.json({
        status: "fail",
        message: err,
      });
    }
  });

module.exports = router;