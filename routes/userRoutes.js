const express =require("express")

const userRouter = express.Router()
const {
        getAllUsers,
        createUser,
        getUserById,
        updateUser,
        deleteUser
                         } = require("../controllers/userController")

//CRUD router for users
userRouter.get('/', getAllUsers)
userRouter.post("/", createUser)
userRouter.get("/:userId",  getUserById)
userRouter.patch("/:userId",  updateUser)
userRouter.delete("/:userId", deleteUser)





module.exports = userRouter