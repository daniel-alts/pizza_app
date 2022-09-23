const User = require('../models/userModels')


exports.auth = async(req, res, next) => {
    next()
//     const body = req.body
//     if (body.email && body.password){
//         const user = await User.find({email: body.email})
//         console.log(user)
//         if (user){
//             if (user[0].password === body.password) next();
//         }
//         else{
//             res.status(400).json({
//                 status: false,
//                 message: 'Incorrect username || password!'
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             status: false,
//             message: 'Please provide email and password!'
//         })
//     }

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