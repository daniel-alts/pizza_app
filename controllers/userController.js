const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const authenticate = require("../middlewares/authenticate");

/*Get all users*/
const getAllUsers = async(req, res) => {
    try {

        const users = await userModel.find();

        return res.status(200).json({message: "users retrieved", data: users});
    } catch (err) {
        return res.json({ status: false, data: err.message });
    }
};

const createUser = async(req, res) => {
    try {
        const { username, password, email } = req.body;
        const emailExist = await userModel.findOne({email})
        if(!emailExist) {
            const hashPassword = bcrypt.hashSync(password, 10);
            const userObject = {
                username,
                email,
                password: hashPassword,
            };
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

module.exports = { getAllUsers, createUser, loginUser };