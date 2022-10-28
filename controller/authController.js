const jwt = require('jsonwebtoken');
const generateJWT = require('../middleware/generateJWT');
const userModel = require('../models/userModel')

require('dotenv').config();

const signup = (req, res) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
}

const login = (req, res, { err, user, info }) => {
    if(!user){
        return res.json({ message: 'Username or password is incorrect'})
    }

    req.login(user, { session: false }, async () => {
        const { error: token } = await generateJWT(user.username);


        if(error){
            return res.status(500).json({
                error: true,
                message: "Couldn't create access token. Please try again later."
            });
        }

        user.accessToken = token;

        await user.save();
    }
        // async (error) => {
        //     if(error) return res.status(400).json(error)

        //     const body = { _id: user._id, username: user.username };

        //     const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'my_secret');
            
        //     return res.status(200).json({ token });
        // }
    )
}

const logout = async (req, res) => {
    try{
        const { username } = req.decoded;

        let user = await userModel.findOne({ username });

        user.accessToken = "";

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User logged out"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error
        })
    }
}

module.exports = {
    signup,
    login,
    logout
}