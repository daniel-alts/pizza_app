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
    const user = await userModel.findOne({ username: req.body.username})
    if(user == null){
        return res.status(400).send('cannot find user');
    }
    
    try{
        bcrypt.compare(req.body.password, user.password, (err, ismatch) => {
            if(err) return res.send(err);

            if(ismatch){
                res.send('Access Granted');
            } else {
                res.send('Access Denied');
            }
            
        })
        // if(await bcrypt.compare(req.body.password, user.password)){
        //     res.send('Access Granted');
        // } else {
        //     res.send('Access Denied');
        // };
    } catch {
        res.status(500).send();
    };
}

module.exports = {
    getUsers,
    addUser,
    userLogin
}

