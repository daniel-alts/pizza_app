const express = require("express");
const User = require("../model/user")
const UsersRoute = express.Router();

UsersRoute.get('/', async (req, res) => {
    const users = await User.find()
    return res.json({ status: true, users })
})

UsersRoute.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)

    const user = await User.create(body)
    return res.status(200).send(`user added successfully, ${user}`)
})

UsersRoute.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log(body)

    const user = await User.findByIdAndUpdate(id, body, { new: true })
    if (!user) {
        return res.status(404).json({ status: false, user: null, message: 'Could Not Find User' })
    }
    if (!body) {
        return res.status(300).json({ status: false, message: 'Input data' })
    }
    await user.save()
    return res.status(200).json(user).send("user updated successfully")
})

UsersRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.deleteOne({ _id: id })

    return res.status(200).send(`User deleted successfully`)
})

module.exports = UsersRoute;