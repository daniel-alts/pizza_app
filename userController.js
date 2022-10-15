const User = require('./userModel');



exports.getAllUsers = async (req, res) => {
        const users = await User.find()
    
        return res.json({ status: true, users })
}

exports.getUser = async (req, res, next) => {
    const id = req.params.id
    const user = await User.findOne(id)

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
}
        
    
exports.createUser = async (req, res) => {
        try{
            const user = await User.create(req.body)
            res.status(200).json({
                status: 'success',
                user
            })
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err
            })
        }
}


exports.updateUser = async (req, res) => {
        try{
            const user = await userModel.findOneAndUpdate(req.body)
            res.status(200).json({
                status: 'success',
                user
            })
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err
            })
        }
}

    
    //Delete user
exports.deleteUser = async (req, res) => {
        try{
            const user = await userModel.findOneAndDelete(req.body)
            res.status(200).json({
                status: 'success',
                user
            })
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err
            })
        }
}
    