// const usersModel = require("./userModel");

// exports.authenticate = async (name, pass) => {
//  // const body = req.body;

//   const users = await usersModel.find();
//   console.log(users);
//    console.log(name);
//    console.log(pass);
//   return new Promise((resolve, reject) => {
//     if (!name) {
//       if (!pass) {
//       reject("User cant be empty");
//       }
//     }
//     const userFound = users.find((user) => {
//       return user.username === name;
//     });
//     if (!userFound) {
//       reject("No User  Found ");
//     };

   
//       if (userFound.password !== pass) {
//         reject("invalid user name or password ");
//       }

//       resolve();
//   });
// };
