const User = require('../model/usermodel');

const createUser = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) return res.status(400).json('please fill all fields');
    const user = await User.create({
        userName,
        password,
    })
    if (!user) return res.status(400).json({ status: false, user: null })
    return res.status(201).json({ ststus: true, user });
}

module.exports = {
    createUser,
}