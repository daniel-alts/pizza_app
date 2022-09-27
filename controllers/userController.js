const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const User = require('../models/userModels')



// A SIMPLE FUNCTION THAT GENERATES TOKEN
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}



// THE PROTECT MIDDLEWARE
exports.protect = async(req, res, next) => {
    //GETTING TOKEN AND CHECKING IF ITS PASSED
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        //SLICING THE TOKEN PASSED OUT FROM THE HEADERS
        token = req.headers.authorization.split(' ')[1]
    }

    //CHECKING IF TOKEN WAS ACTUALLY PASSED
    if (!token){
        res.status(401).json({
            status: false,
            message: 'You are not logged in! Please log in!'
        })
    }

    //VERIFY TOKEN
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    //CHECKING IF USER EXISTS
    const user = await User.findById(decoded.id)

    if (!user){
        return res.status(400).json({
            status: false,
            message: err
        })
    }
    req.user = user
    next()

}


// A FUNCTION TO SIGNUP USERS
exports.signUp = async(req, res) =>{


    try{
        // NEW USER OBJECT
        const newUser = await User.create(req.body)

        // USER TOKEN
        const token = signToken(newUser._id)

        // SUCCESSFUL RESPONSE
        return res.status(200).json({
            status: true,
            data: {
                newUser
            },
            token,
        });
    }
    //FAIL RESPONSE
    catch(err){
        return res.status(400).json({
            status: false,
            message: err
        })
    }
}


// LOGIN USER
exports.login = async(req, res, next) => {
    const {email, password} = req.body

    //CHECKING IF PASSWORD OR EMAIL WASN'T PASSED IN THE REQUEST
    if (!email || !password){
        return res.status(400).json({status: false, message: 'Please provide email and password!'})
    }

    // FETCH USER FROM DB
    const user = await User.findOne({email})

    // PERFORM CONDITIONAL CHECK IF USER WASN'T FOUND OR PASSWORD WAS INCORRECT
    if (!user || !await user.comparePassword(password, user.password)){
        return res.status(400).json({
            status:false, message: 'Incorrect email or password!'
        })
    }
    
    // ASSIGN TOKEN TO THE LOGGED IN USER
    const token = signToken(user._id)
    return res.status(200).json({
        status: true,
        token
    })

}
