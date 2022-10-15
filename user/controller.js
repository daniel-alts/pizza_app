const { BrokenCode, BadRequest, NotFound } = require('../error');
const User = require('./model');

exports.createUser = async (req, res, next) => {
    try {
        const { username, password, user_type } = req.body;

        const found = await User.findOne({ username });

        if (found) return BadRequest(res, 'username is taken!');

        const user = await User.create({
            username,
            password,
            user_type
        });

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);

        if (error.message.toLowerCase().includes('validation')) return BadRequest(res, error.message);

        return BrokenCode(res);
    }
}

exports.findAllUsers = async (req, res, next) => {
    try {
        const query = req.query;

        const users = await User.find({ ...query });


        res.status(200).json({
            status: true,
            data: users
        });
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}

exports.findUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) return NotFound('User not found!');

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}

exports.findMe = async (req, res, next) => {
    try {
        const { username } = req.user;

        const user = await User.findOne({ username });

        if (!user) return NotFound('User not found!');

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}

exports.patchMe = async (req, res, next) => {
    try {
        const { username } = req.user;
        const { newUsername, password, user_type } = req.body;

        const user = await User.findOne({ username });

        if (!user) return NotFound(res, 'User not Found! Please Log In.');

        const found = await User.findOne({ username: newUsername });

        if (found) return BadRequest(res, 'new username is taken!');

        user.username = newUsername || user.username;
        user.password = password || user.password;
        user.user_type = user_type || user.user_type;

        await user.save({ validateModifiedOnly: true, validateBeforeSave: false });

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);

        if (error.message.toLowerCase().includes('validation')) return BadRequest(res, error.message);

        return BrokenCode(res);
    }
}

exports.deleteMe = async (req, res, next) => {
    try {
        const { username } = req.user;

        const user = await User.findOneAndRemove({ username });

        res.status(204).json({
            status: true
        })
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}