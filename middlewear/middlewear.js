const userModel = require("../models/userModels");
const bcrypt = require('bcrypt');

// AN AUTHENTICATION TO PROTECT THE ORDER ROUTES
const authenticateUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  //   console.log(authorization);

  if (!authorization) {
    return res.status(403).send({ message: "Forbidden" });
  }
  const encoded = authorization.substring(6);

  const decoded = Buffer.from(encoded, "base64").toString("ascii");
 
  const [username, password] = decoded.split(":");

  const authenticatedUser = await userModel.findOne({ username });
  const match = await bcrypt.compare(password, authenticatedUser.password)
  if(match){
    req.authenticatedUser = authenticatedUser;
  }


  next();
};

module.exports = { authenticateUser };






























// // MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
// const authenticateUser = async (req, res, next) => {
//   try {
    
//     // check if auth header exists
//     if (req.headers.authorization) {
//       // parse token from header
//       const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
//       if (token) {
//         const payload = await jwt.verify(token, process.env.SECRET);
//         if (payload) {
//           // store user data in request object
//           req.user = payload;
//           next();
//         } else {
//           res.status(400).json({ error: "token verification failed" });
//         }
//       } else {
//         res.status(400).json({ error: "malformed auth header" });
//       }
//     } else {
//       res.status(400).json({ error: "No authorization header" });
//     }
//     const authorization = req.headers.authorization;
//     if(authorization) {
//       const encoded = authorization.substring(6);
//       const decoded = Buffer.from(encoded, 'base64').toString('ascii');
//       const [email, password] = decoded.split(':');
//       const authenticatedUser = await userModel.findByEmail(email);
//       const match = await bcrypt.compare(password, authenticatedUser.password);
//       if(match){
//         req.authenticatedUser = authenticatedUser;
//       }
//     }
  
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// // export custom middleware
// module.exports = {
//   authenticateUser,
// };

