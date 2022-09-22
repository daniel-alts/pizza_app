module.exports = async (req, res, roles, model) => {
  return new Promise((resolve, reject) => {
    if (!req.body.id ) {
      reject("Please provide user id");
    }
    
    const user = await model.findById(req.body.Id)
    if (!user) {
      reject("User does not exist");
    }
    if (!roles.includes(user.user_type)) {
      reject("User does not have have access to this feature");
    }
    // if (req.body.password === user.password && roles.includes(user.role)) {
    //   resolve("User found");
    else {
      resolve("User has access");
    }
  });
};
