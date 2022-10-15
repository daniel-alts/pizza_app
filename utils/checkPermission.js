const { request } = require("express");
const CustomError = require("../errors");

const checkPermission = (requestUser, resourceUserId) =>{
    if(requestUser.userType === "admin") return;
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new CustomError.UnauthorizedError("Not authorized to access this route")
}

module.exports = checkPermission