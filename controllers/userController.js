const User = require('../models/userModels')


exports.auth = async(req, res, next) => {
    const {email, password} = req.body


    if (!email || !password){
        return res.status(400).json({
            status: false,
            message: "please provide email and password!"
        })
    }
    const user = await User.findOne({email: email})
    if (!user){
        return res.status(400).json({status: false, message: "Incorrect email or password!"})
    }

    if (user.password !== password){
        return res
          .status(400)
          .json({ status: false, message: "Incorrect email or password!" });
    }
    next()

}

exports.createUser = async(req, res) =>{
    try{
        const newUser = await User.create(req.body)
        res.status(200).json({
            status: true,
            newUser
        })
    }
    catch(err){
        res.status(400).json({
            status: false,
            message: err

        })
}
}