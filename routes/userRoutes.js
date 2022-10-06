const express =require("express")

const userRouter = express.Router()
const {
        getAllUsers,
        createUser,
                        } = require("../controllers/userController")




                        
userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)



module.exports = userRouter