var express = require('express');
var router = express.Router();
var passport = require("passport")
const bodyParser = require("body-parser")
var User = require("../models/userSchema")

var authenticate = require('../authenticate');

router.use(bodyParser.json())

/* GET users listing. */
router.get('/', authenticate.verifyUser, function(req, res, next) {
  User.find({})
  .then((users)=>{
    if(users == null){
      var err = new Error('No user found')
      err.status = 404
      return next(err)
    }
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json({status: true, users})
  })
  .catch((err)=>{
    res.json({status:false, err})
  })
});

router.post("/signup", (req, res, next)=>{
  User.register( new User({username:req.body.username}), req.body.password, (err, user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({err: err})
    }
    else{
      if(req.body.firstname){
        user.firstname = req.body.firstname
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname
      }
      user.save((err,user)=>{
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req,res, ()=>{
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({success: true, status:'registration successful'})
        })
      })
    }
  })
});

router.post("/login", passport.authenticate("local"),(req, res)=>{
  var token = authenticate.getToken({_id: req.user._id})
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({success: true, token, status:'You are successfully logged in'})
})

router.get("/logout", (req, res, next) =>{
  if(req.session){
    req.session.destroy()
    res.clearCookie("session-id")
    res.redirect('/')
  }
  else{
    var err = new Error("You are not logged in")
    err.status = 403;
    res.json({status:false, message:"logout failed"})
  }
})

module.exports = router;
