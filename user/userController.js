const express = require('express');
const User = require('./User');
const UserService = require('./UserServices')

const idNumberControl = require('../shared/idNumberControl');
const BasicAuth = require('./middleWear');
const UserNotFound = require('./UserNotFound')
const { body, validationResult } = require('express-validator');
// const bcrypt = require("bcrypt")
// const jwt = require('jsonwebtoken');


const router = express.Router();
// const { SECRET = "secret" } = process.env;

// router.post('/signup', async (req,res) =>{
//     try{
//         req.body.password = await bcrypt.hash(req.body.password, 10)
//         const user = await User.create(req.body)
//         res.json(user)
//     }catch(error){
//         res.status(400).json({ error });
//     }
// })


// router.post("/login", async(req, res) => {
//     try {
//       // check if the user exists
//       const user = await User.findOne({username: req.body.username});
//       if (user) {
//         //check if password matches
//         const result = await bcrypt.compare(req.body.password, user.password);
//         if (result) {
//           // sign token and send it in response
//           const token = await jwt.sign({ username: user.username }, SECRET);
//           res.json({ token });
//         } else {
//           res.status(400).json({ error: "password doesn't match" });
//         }
//       } else {
//         res.status(400).json({ error: "User doesn't exist" });
//       }
//     } catch (error) {
//       res.status(400).json({ error });
//     }
//   });
  
//   module.exports = router




 
router.post('/', 
body('username')
  .notEmpty().withMessage('username_null')
  .bail()
  .isLength({min: 4, max: 32}).withMessage('username_size'),
body('email')
  .isEmail().withMessage('email_invalid')
  .bail()
  .custom(async (email) => {
    const user = await UserService.findByEmail(email)
    if(user){
      throw new Error('email_inuse');
    }
  })
  ,
async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next();
  }
  await UserService.create(req.body);
  res.send({message: req.t("user_create_success")});
})

// router.get('/users', pagination, async (req, res) => {
//   const page = await UserService.getUsers(req.pagination);
//   res.send(page);
// })


router.get('/users/:id', idNumberControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
})

router.put('/users/:id', idNumberControl, BasicAuth, async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send('updated');
})

router.delete('/users/:id', idNumberControl, BasicAuth, async (req, res) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}});
  res.send('removed');
})

module.exports = router;