const userModel = require('../models/userModel');

const createUser = async (req, res) => {
    const body = req.body;

    try {
        const user = await userModel.create(body);
        res.status(201).json({ status: true, user })
    } catch (error) {
        res.status(500).send("Error occurred while trying to create user", error);
    }
}

const getOneUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id)
        res.status(200).json({ status: true, user })
    } catch (error) {
        res.status(404).json({ status: false, user: null }); 
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json({ status: true, users })
    } catch (error) {
        res.status(404).json({ status: false, users: null }); 
    }
   
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(id, newUser, {new:true});
        res.status(200).json({ status: true, user })
    } catch (error) {
        res.status(404).json({ status: false, user: null , message: "something went wrong"})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.deleteOne({ _id: id})
        res.status(200).send("user deleted successfully")
    } catch (error) {
        res.status(404).json({ status: false, user: null, message: "something went wrong" }); 
    }
    
}

const getByUserName = async (userName) => {
    const user = await userModel.findOne({ userName: userName });
    return user
}

//exports
module.exports = {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getByUserName
}