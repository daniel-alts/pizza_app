const authRoute = require("express").Router()
const bcrypt = require("bcryptjs")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const userModel = require("../modal/userModel")

authRoute.post("/signup", async (req, res)=>{
    const body = req.body;
    body.user_type = "user"
    try{

        const salt = await bcrypt.genSalt(10)

        body.password = await bcrypt.hash(body.password, salt)

        await userModel.create(body)
            .then((data)=>{

                res.status(200).send({
                    message: "successfully added",
                    data:  data
                })
            }).catch((err)=>{
                if(err.code === 11000){

                    res.status(400).send({
                        message: "User already exists",
                    
                    })
                }else{
                    console.log(err)
                    res.status(400).send({
                        message: err.message,
                    
                    })
                }
            })
        
    }catch(err){
        console.log(err)
    }
})


authRoute.post("/signin", async (req, res)=>{
    const body = req.body

        const user = await userModel.findOne({email: body.email})
        // .then((user)=>{
        //     if(!user){
        //         return res.status(403).send("user not found")
        //     }
            
        // })
        .catch((err) =>{
            return res.status(400).send(err)
        })

        if(!user){
            return res.status(404).send("user not found")
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password)

        if(!isPasswordMatch){
            return res.status(403).send("Incorrect paswword")
        }

        const token = await jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );

          
          user.token = token;
          let authUser = Object.assign({}, user._doc)

          authUser.token = token;

        res.status(200).send({message: "successfully signed in", data: authUser})
        
   
})

module.exports = authRoute
