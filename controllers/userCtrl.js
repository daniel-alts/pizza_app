const userModel = require("../model/userModel");
const authenticate = require("../middlewares/authenticate");

/*Get all users*/
const getAllUsers = async(req, res, next) => {
    try {
        const authenticatedUser = req.authenticatedUser;

        if (!authenticatedUser) {
            return res.status(403).send({ message: "Forbidden" });
        }
        if (authenticatedUser.role !== "admin") {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const users = await userModel.find({}, { username: 1, user_type: 1 });

        return res.json({ status: true, users });
    } catch (err) {
        return res.json({ status: false, data: err.message });
    }
};

const createUser = async(req, res) => {
    try {
        const { username, password, user_type } = req.body;
        const userObject = {
            username,
            password: req.body,
        };
        if (user_type) userObject.user_type = user_type;
        const user = new userModel(userObject);
        user
            .save()
            .then((result) => {
                const { id, username, user_type } = result;
                const returnObj = { id, username, user_type };
                return res.status(201).json({ status: true, data: returnObj });
            })
            .catch((err) => {
                console.log("error occured", err);
                return res.status(201).json({ status: false, message: err.message });
            });
    } catch (err) {
        res.json(err);
    }
};

module.exports = { getAllUsers, createUser };