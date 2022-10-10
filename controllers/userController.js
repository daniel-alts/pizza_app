<<<<<<< Updated upstream
=======
const express = require("express");
>>>>>>> Stashed changes
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

/*Get all users*/
const getAllUsers = async(req, res) => {
    try {
<<<<<<< Updated upstream

        const users = await userModel.find();

        return res.status(200).json({message: "users retrieved", data: users});
=======
        //hash the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        //create a new user
        const user = await userModel.create(req.body);
        return res.json({ status: true, user });
>>>>>>> Stashed changes
    } catch (err) {
        return res.json({ status: false, data: err.message });
    }
};

const createUser = async(req, res) => {
    try {
        const { username, password, email } = req.body;
<<<<<<< Updated upstream
        const emailExist = await userModel.findOne({email})
        if(!emailExist) {
=======
        const emailExists = await userModel.findOne({ email });
        if (!emailExists) {
>>>>>>> Stashed changes
            const hashPassword = bcrypt.hashSync(password, 10);
            const userObject = {
                username,
                email,
                password: hashPassword,
            };
<<<<<<< Updated upstream
            console.log("userObject =>", userObject)
            const user = await userModel.create(userObject)
            res.status(201).json({message: "user created successfully", data: user})
        } else {
            throw new Error("email exists")
        }
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            throw new Error("email and password and required to login")
        }

        const user = await userModel.findOne({email});
        if(user) {
            const verifyPassword = await bcrypt.compare(password, user.password);
            if(verifyPassword) {
                const data = {
                    id: user._id,
                    email: user.email
                }
                const token = jwt.sign(data, process.env.SECRET, {expiresIn: "30d"})
                return res.status(200).json({message: "user logged in successfully", token})
            } else {
                throw new Error("email or password not correct")
            }
        } else {
            throw new Error("user not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
}

=======
            console.log("userObject =>", userObject);
            const user = await userModel.create(userObject);
            res
                .status(201)
                .json({ message: "user created successfully", data: user });
        } else {
            throw new Error("email exists");
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("username and password are required to login");
        }

        const user = await userModel.findOne({ email });
        if (user) {
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (verifyPassword) {
                const data = { id: user._id, email: user.email };
                const token = jwt.sign(data, process.env.JWT_SECRET, {
                    expiresIn: "30d",
                });
                return res
                    .status(200)
                    .json({ message: "user logged in sucessfully", token });
            } else {
                throw Error("email or password not correct");
            }
        } else {
            throw new Error("user not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

>>>>>>> Stashed changes
module.exports = { getAllUsers, createUser, loginUser };