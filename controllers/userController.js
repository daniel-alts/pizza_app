// const userModel = require("../models/userModels");


// // SIGNING FOR USERS
// const signupUser = async (req, res) => {
//   //   console.log(body);

//   try {
//     const body = req.body;

//     const newUser = await userModel.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     return res.status(201).send({
//       message: "User has been succesfully signed up",
//       data: newUser,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// };

// //LOGIN FOR USERS

// const loginUser = async (req, res, next) => {
//   const { password, email } = req.body;

//   if (!password || !email) {
//     return res.status(400).send("Please provide email and password!");
//   }

//   //CHECK IF A USER EXIST THE DB USING HIS EMAIL
//   const user = await userModel.findOne({ email });

//   // IF THE USER DOES NOT EXIST
//   if (!user) {
//     return res.status(404).send("User not found. Please Sign up");
//   }

//   if (user.password !== password) {
//     return res.status(404).send("User not found. Please Sign up");
//   }

//   //IF THE USER EXIST THEN HE/SHE CAN LOGIN
//   return res.status(200).send("Login Successful");
// };

// module.exports = { signupUser, loginUser };


















const userModel = require("../models/userModels");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { SECRET = "secret" } = process.env;
const passport = require('passport');


// SIGNING FOR USERS
const signupUser = async (req, res) => {
  try {
    const body = req.body;  
    const harshedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: harshedPassword ,
    });

    console.log(newUser)

    return res.status(201).send({
      message: "User has been succesfully signed up",
      data: newUser,
     
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }


};

//LOGIN FOR USERS

const loginUser = async (req, res, next) => {
  try{
    const { password, email } = req.body;
    //CHECK IF A USER EXIST THE DB USING HIS EMAIL
    const user = await userModel.findOne({ email});
    passport.authenticate("local", (err, users) =>{
      if(err){
        return res.status(400).json({errors:err})
      }

      if(!users){
        return res.status(400).json({errors: "no user found"})
      }
    })

  
    // IF THE USER DOES NOT EXIST
    if (user) {
    const results  = await bcrypt.compare(password, user.password)
    if(results){
      const token  = jwt.sign({ email: user.email}, SECRET);
     return res.json({ token })
    }else {
                res.status(400).json({ error: "password doesn't match" });
              }
            } else {
              res.status(400).json({ error: "User doesn't exist" });
            }

  }

        catch (error) {
          res.status(400).json({ error });
        }
};

module.exports = { signupUser, loginUser };