const userService = require('../services/user.service')


const postUser = async (req, res) => {
    const user = req.body;
    const newUser = await userService.createUser();
    res.json({ status: true, newUser});
}

const updateUser =async (req, res) => {
    const { _id, state } = req.body;
    const updatedUser =await userService.updateUser(_id, state);
    res.json({ status: true, updatedUser});
}

const deleteUser = async(req, res) => {
    const { _id } = req.params;
    const deletedUser = await userService.deleteUser(_id);
    res.json({ status: true, deletedUser})
}

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json({ status:true, users})
}

const getUser = async (req, res) => {
    const { _id } = req.params;
    const user = await userService.getUser(_id);
    res.json(user)
}