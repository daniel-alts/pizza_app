const userService = require('../services/user.service')


const postUser = async (req, res) => {
    const newUser = await userService.createUser();
    res.json(newUser);
}

const patchUser =async (req, res) => {
    const { _id, state } = req.body;
    const patchedUser =await userService.updateUser(_id, state);
    res.json(patchedUser);
}

const deleteUser = async(req, res) => {
    const { _id } = req.params;
    const deletedUser = await userService.deleteUser(_id);
    res.json(deletedUser)
}

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users)
}

const getUser = async (req, res) => {
    const { _id } = req.params;
    const user = await userService.getUser(_id);
    res.json(user)
}