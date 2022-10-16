const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    userModel.find({})
        .then(result => {
            return res.json(result)
        })
        .catch(err => console.log(err))
}

const addUser = async (req, res) => {
    try{
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            password: hashedPassword
        }
        const newUser = new userModel(user);
        newUser.save()
            .then((result) => {
                return res.status(201).json({ status: true, data: result })
            })
            .catch((err) => {
                console.log('An error occured', err)
                return res.status(400).json({ status: false, message: err.message })
            })
    } catch(err) {
        res.json(err)
    };
}

const userLogin = async (req, res) => {
    const users = await userModel.find({});
    const user = users.find((user) => user.username = req.body.username);
    if(user == null){
        return res.status(400).send('cannot find user');
    }
    
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Access Granted');
        } else {
            res.send('Access Denied');
        };
    } catch {
        res.status(500).send();
    };
}

module.exports = {
    getUsers,
    addUser,
    userLogin
}

