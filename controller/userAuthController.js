const jwt = require('jsonwebtoken');
const User = require("../model/userModel")

require('dotenv').config();

const signup = async (req, res) => {

    const newUser =  new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
   try{
        const savedUser = await newUser.save()
        console.log(savedUser)
        res.status(200).json("registration successful")

    }catch(err) {
        console.log(err)
        res.status(404).json(err)
    }
    
    //res.json({
    //message: 'Signup successful',
    //     user: req.user
    //});
}

// const login = (req, res, { err, user, info}) => {

//     if (!user) {
//         return res.json({ message: 'Username or password is incorrect'})
//     }

//     // req.login is provided by passport
//     req.login(user, { session: false },
//         async (error) => {
//             if (error) return res.status(400).json(error)

//             const body = { _id: user._id, username: user.username };
//             //You store the id and username in the payload of the JWT. 
//             // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
//             // DO NOT STORE PASSWORDS IN THE JWT!
//             const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

//             return res.status(200).json({ token });
//         }
//     );
//}
module.exports = signup