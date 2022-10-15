const User = require('../model/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
module.exports = {
  createUser: async (req, res, next) => {
    res.status(200).json({msg : "Register Successfully", user : req.user})
  },

  logIn: async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
      try {
        if (err) return next(err)
        
        if (!user) {
          const error = new Error("Username and Password not valid.")
          return next(error)
        }


        req.login(user, { session: false },
          async (error) => {
              if (error) return next(error);

              const payload = { _id: user._id, username: user.username };
       
              const token = jwt.sign({ user: payload }, 'jajka');

              return res.json({ token });
          }
        );
        
  } catch (error) {
      return next(error);
  }

      
    })(req, res, next)
  }
  
}