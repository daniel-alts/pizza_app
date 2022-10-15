const userModel = require('../models/userModel')


const registerUser = async (req, res, next) => {
    try{
        res.json({
            status: true,
            message: 'Sign-up successful',
            user: req.user,
          })
    } 
    catch(err){
        next(err)
    }
}

const userLogin = async (req, res, next) => {
    try {
        if (err) {
            return next(err);
        }
        if (!user) {
            const error = new Error('Username or password is incorrect');
            return next(error);
        }

        req.login(user, { session: false },
            async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, username: user.username };
                //You store the id and email in the payload of the JWT. 
                // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                // DO NOT STORE PASSWORDS IN THE JWT!
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                return res.json({ token });
            }
        );
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    registerUser,
    userLogin
}