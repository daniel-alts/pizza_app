const User = require('../models/user.model');

const createUser = (newUser) => {
    const user = new User.model()
}

const updateUser = async (_id, updates) => {
    const updated = await User.updateOne({_id},{updates});
    return updated;
}

const deleteUser = async (_id) => {
    const deleted = await User.deleteOne({_id});
    return deleted;
}

const getUser = async (_id) => {
    const user = await User.findById({_id});
    return user;
}

const getUsers = async () => {
    const users = await User.find({});
    return users;
}