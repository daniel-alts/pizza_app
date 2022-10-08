const { userModel } = require('../models/userModel');

async function getUsers(req, res) {
    const users = await userModel.find()
    return res.json({ status: true, users })
}


async function addUser(req, res) {
    const body = req.body;
    console.log(body)

    const user = await userModel.create(body)

    return res.status(200).send(`user added successfully, ${user}`)
}

async function updateUser(req, res) {
    const { id } = req.params;
    const body = req.body;
    console.log(body)

    const user = await userModel.findByIdAndUpdate(id, body, { new: true })

    if (!user) {
        return res.status(404).json({ status: false, user: null, message: 'Could Not Find User' })
    }

    if (!body) {
        return res.status(300).json({ status: false, message: 'Input data' })
    }

    await user.save()

    return res.status(200).json(user).send("user updated successfully")
}

async function deleteUser(req, res) {
    const { id } = req.params;

    const user = await userModel.deleteOne({ _id: id })

    return res.status(200).send(`user deleted successfully`)
}

module.exports = { getUsers, addUser, updateUser, deleteUser }