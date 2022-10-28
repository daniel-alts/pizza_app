const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');

require('dotenv').config();

exports.register = async (req, res) => {

    try {
        const checkUser = await UserModel.findOne({ username: req.body.username })

        if (checkUser) {
            return res.status(400).send("User Already exists");
        }

        user = new UserModel();
        console.log(user)
        user.firstname = req.body.firstName
        user.lastname = req.body.lastName
        user.email = req.body.email
        user.password = req.body.password
        user.username = req.body.username
        user.user_type = req.body.user_type

        await user.save()

        delete user.password

        res.status(201).json({
            message: 'Signup successful',
            user: user
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
}


exports.login = (req, res, { err, user, info }) => {

    if (!user) {
        return res.json({ message: 'Username or password is incorrect' })
    }

    // req.login is provided by passport
    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: user._id, username: user.username };
            //You store the id and username in the payload of the JWT. 
            // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
            // DO NOT STORE PASSWORDS IN THE JWT!
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'secret_token');

            return res.status(200).json({ token });
        }
    );
}