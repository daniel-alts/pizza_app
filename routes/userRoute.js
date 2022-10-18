const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const server = express.Router()

server.post('/register', 
        passport.authenticate('register', { session: false }), async (req, res, next) =>{
            res.json({message: 'signup successful'})
        })
        

        // async(req, res)=>{
        // const body = req.body
        // const user = await userModel.create(body)
        // res.json({user})}


server.get('/login', 
        async (req, res, next) =>{
            passport.authenticate('login', async (err, user, info) => {
                try {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        const error = new Error('Username or password is incorrect');
                        return next(error);
                    }
    
                    req.login(user, { session: false },
                        async (error) => {
                            if (error) return next(error);
    
                            const body = { _id: user._id, username: user.username };
                
                            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
    
                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
            )(req, res, next);



        // const body = req.body
        // const user = await userModel.find({username: body.username, password: body.password})
        // console.log(user)
        // if(user.length == 0){
        //     res.send('wrong username or password')
        // }else{
        //     res.send('login successful')
        // }
})

module.exports = server