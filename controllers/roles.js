require ("dotenv").config();

const user_type = async (req, res, next) => {
    if (user_type === "admin")
        return res.status(401).send({ message: "Not an admin, can't perform action" });

    next();
};







//     const { user_type } = req.body;
//     // First - Verifying if role and id is presnt
//     if (user_type) {
//       // Second - Verifying if the value of role is admin
//       if (user_type === "admin") {
//         // Finds the user with the id
//         await User.findById(id)
//           .then((user) => {
//             // Third - Verifies the user is not an admin
//             if (user.user_type !== "admin") {
//               user.user_type = user_type;
//               user.save((err) => {
//                 //Monogodb error checker
//                 if (err) {
//                   res
//                     .status("400")
//                     .json({ message: "An error occurred", error: err.message });
//                   process.exit(1);
//                 }
//                 res.status("201").json({ message: "Update successful", user });
//               });
//             } else {
//               res.status(400).json({ message: "User is already an Admin" });
//             }
//           })
//           .catch((error) => {
//             res
//               .status(400)
//               .json({ message: "An error occurred", error: error.message });
//           });
// }   }}



module.exports = { user_type };