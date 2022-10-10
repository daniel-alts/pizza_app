const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");
require("dotenv").config();

const RegisterUser = async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    try {
      if (err) {
        next(err);
      }

      req.logIn(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          username: user.username,
          type: user.user_type,
        };

        const token = jwt.sign({ user: body }, process.env.SECRET);

        return res.json({ token, message: info.message });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const loginUser = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          _id: user._id,
          username: user.username,
          type: user.user_type,
        };
        const token = jwt.sign({ user: body }, process.env.SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const getUsersById = async (req,res,next) => {
    try {
        const {userid,username} = req.query

        const findUser = await UserModel.findOne({username})
        // console.log(findUser)
        if(findUser.user_type != "admin"){
            return res.status(401).json({message: "access denied"})
        }
        const user = await UserModel.findById(userid)
        // console.log(user)
        return res.json({user})
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req,res,next) => {
    try {
        const {userid} = req.query
        const update = req.body
    
    
        await UserModel.findByIdAndUpdate(userid,{$set: update})
        return res.json({message: "user updated succesfully"})
    } catch (error) {
        next(error)
    }

}

const deleteUser = async (req,res,next) => {
    try {
        const {userid} = req.params

        const userToDelete = await UserModel.findByIdAndDelete(userid)
        return res.json({userToDelete, message:"user deleted"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
  RegisterUser,
  loginUser,
  getUsersById,
  updateUser,
  deleteUser
};
