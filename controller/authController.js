const jwt = require('jsonwebtoken');

require('dotenv').config();

const signup = (req, res) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
}

const login = (req, res, { err, user, info }) => {
    if(!user){
        return res.json({ message: 'Username or password is incorrect'})
    }

    req.login(user, { session: false },
        async (error) => {
            if(error) return res.status(400).json(error)

            const body = { _id: user._id, username: user.username };

            const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'my_secret');
            
            return res.status(200).json({ token });
        }
    )
}

module.exports = {
    signup,
    login
}