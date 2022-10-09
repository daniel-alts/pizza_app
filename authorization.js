const userModel = require('./models/user')

 function authorize(req, res) {
  return new Promise((resolve, reject) => {

    const userId = req.user["_id"]

    userModel.findById(userId, function (err, user) {
      if(req.method === 'GET'){
        resolve()
          return;
      }
      if(user.user_type === "user"){
              return res.status(401).send("You're unauthorized");
            }
          resolve()
    });
  
  })
}


module.exports = {
  authorize
}