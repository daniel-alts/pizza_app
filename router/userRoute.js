const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userRouter = require('express').Router()
// const userController = require('../controller/user')



userRouter.post(
  '/signup',
  passport.authenticate('signup', { session: false }), 
  async (req, res, next) => {
      res.json({
          status: 'successful',
          message: 'Signup successful',
          user: req.user
      });
  }
);

userRouter.post(
  '/login', 
  async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try{
        if(err){
          return next(err)
        }
        req.login(user, {session: false},
          async (err) => {
            if(err) return next(err)

            const body = { _id: user.id}
            const token = jwt.sign({user:body}, process.env.JWT_SECRET)
            return res.json({token})
          }
        )
      }catch(err){
        return next(err)
      }
    })(req,res,next)
  }
  
)




module.exports = userRouter