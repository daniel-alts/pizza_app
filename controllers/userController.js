const userModel = require('../models/userModel')
const passport = require('passport')
const jwt = require('jsonwebtoken')



// async function createUser(req,res){
//     const body = req.body
//     const password = req.body.password
//     const salt = await bcrypt.genSalt()
//     const hashedPassword = await bcrypt.hash(password, salt)
//     const user = {firstName: req.body.firstName, lastName:req.body.lastName, username:req.body.username, password: hashedPassword, user_type: req.body.user_type}
//     await userModel.create(user).then(()=>{
//         res.status(201).send(user)
//     })
//    .catch((err)=>{
//     res.status(500).send(err)
//    })
// }

require("dotenv").config()
exports.signUp = async (req,res,next)=>{
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }


  exports.login = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          const error = new Error('Username or password is incorrect');
          return next(error);
      }
  
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
  
          const body = { _id: user._id, username: user.email, user_type: user.user_type };
 
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
  
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };

  exports.getUsers = async (req, res, next) =>{
    const users = await userModel.find()
    res.status(200).send(users)
}

exports.deleteUserById = async (req, res, next) =>{
    const id = req.params.id
    await userModel.findByIdAndDelete(id).then(()=>{
        res.status(200).send({
            message:'User Deleted Successfully'
        })
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

// module.exports = {login, signUp, getUsers, deleteUserById}