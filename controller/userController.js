const db = require('../models/model');
const moment = require('moment');


const userModel = db.User

// Creating User
const createUser = async (req, res, next) => {
    try {
        const {username, password, phoneNumber,address} = req.body;
        const userObj = {
            username, password, 
            phoneNumber,address
        }

        const user = await userModel.create(userObj);
        return res.status(201).json({
            status: true,
            message: "User successfully created!",
        })

    } catch (error) {
        console.log(error)
        next(error)
    }      
}

// READ
const getAllUser = async(req, res, next) => {
    const authenticatedUser = req.authenticateUser
    try {
        if(!authenticatedUser){
            return res.status(403).json({message: "Forbidden"})
        }
        if(authenticatedUser.role !== 'admin') {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        const user = await userModel.find()

        return res.status(200).json({status: true, user });

    } catch (error) {
        console.log(error)
        next(error)
    }
};

// Getting User by ID
const getUserById =  async(req, res, next) => {
    const authenticatedUser = req.authenticateUser
    const id = req.params.id
    try {
        if (!authenticatedUser) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        
        const user = await userModel.findById({_id: id})

        if (!user) {
            return res.status(404).send(`User with id: ${id} does not exit`)
        }

        return res.json({
            status: true,
            user
        })

    } catch (error) {
        console.log("An error occurred", error);
        next(error)
    }
};

// Updating User details
const updateUserById = async(req, res, next) => {
    const authenticatedUser = req.authenticatedUser
    const id = req.params.id
    const bodyToUpdate = req.body;

    try {
        
       if (!authenticatedUser){
           return res.status(403).json({
               message: 'Forbidden'
           })
       }
        bodyToUpdate.lastUpdateAt = moment().toDate();

        const user = userModel.findByIdAndUpdate(id, bodyToUpdate, {new: true});

        if (!user) {
            return res.status(404).json({ 
                status: false,
                user: null
            })
        }

        return res.status(201).json({ status: true, user });

    } catch (error) {
        console.log('An error occurred', error)
        next(error)
    }
};

// Deleting user
const deleteUserById = async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;
    const id = req.params.id
    try {
        if(!authenticatedUser) {
            return res.staus(403).json({
                message: "Forbidden"
            })
        }
        if (authenticatedUser.role !== 'admin') {
            return res.status(401).json({
                message: "Unauthourized"
            })
        }
        const user = await userModel.findByIdAndDelete({_id: id})

        return res.status(201).json({
            status: true,
            user
        })

    } catch (error) {
        error.message = "An error Occurred";
        next(error)
    }
};


module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
}