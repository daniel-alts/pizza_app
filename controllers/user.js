const { errorResponse, successResponse, handleError } = require("../utils/responses");
const models = require("../models");
const bcrypt = require("bcrypt");



async function createUser(req, res) {
    try {
        const { firstName, lastName, phone, email, password } = req.body;
        const emailExist = await models.User.findOne({ email });
        if (emailExist) {
            return errorResponse(res, 409, "email already registered by another user.");
        }
        const phoneExist = await models.User.findOne({ phone });
        if (phoneExist) {
            return errorResponse(res, 409, "phone number already used by another user.");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await models.User.create({
            firstName, lastName, email, password: hashedPassword, phone
        });
        return successResponse(res, 201, "User created successfully. Kindly login.");
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await models.User.findOne({ email });
        if (!user) return errorResponse(res, 404, "Email does not exist.");
        const userDetails = { _id: user._id, email, firstName: user.firstName, lastName: user.lastName, phone: user.phone, role: user.role };
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return errorResponse(res, 404, "Password is incorrect");
        return successResponse(res, 200, "Logged in successfully.", userDetails);
    } catch (error) {
        handleError(error, req);
        return errorResponse(res, 500, "Server error.");
    }
}


module.exports = {
    createUser,
    loginUser
};
