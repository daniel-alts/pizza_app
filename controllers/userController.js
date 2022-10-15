const User = require("../models/userModel");
const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const {createTokenUser} = require("../utils");



//REGISTRATION
const register = async(req, res ) => {
  const {email, username, password} = req.body
  const emailAlreadyExist = await User.findOne({email})
  if(emailAlreadyExist){
    throw new CustomError.BadRequestError("Email already exist")
    return;
  }



  //first registration user is an admin
  const isFirstAccount = await User.countDocuments({}) === 0;
  const user_type = isFirstAccount ? 'admin' : 'user';
  
  const user = await User.create({email, username, password, user_type});

  const tokenUser = createTokenUser(user);

  res.status(StatusCodes.CREATED).json({user: tokenUser});
};



const login = async(req, res) =>{
  const { email, password } = req.body;

  if (!email || !password ) {
    throw new CustomError.BadRequestError("Please provide email or password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid login");
  }
  const tokenUser = createTokenUser(user);

  res.status(StatusCodes.OK).json({ user: tokenUser });
};



module.exports = {register, login}; 