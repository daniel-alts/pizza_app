const userModel = require('./models/user')

function authenticate(req, res) {
  return new Promise((resolve, reject) => {
      //Do authentication here

  const body = req.body;
  if(!body){
    
  }
  if (Object.keys(body).length === 0) {
    return res.status(400).send("Enter a username and password");
    reject("User not found! Please sign up!")
  }
  const { username, password } = body;

  userModel.find({ username, password }, function (err, user) {
     //check if user is in database

    //  if(err){
      
    //   reject("Invalid username or password!")
    //  }
    if (user.length === 0) {
      // res.status(404).send("invalid username or password");
      // return;
      return res.status(404).send("Invalid username or password!");
      reject("Invalid username or password!")

    } 
    //if it is a GET request, we need to check for authorization
      if(req.method === 'GET'){
        resolve()
        return;
      }
      
      if(user[0].user_type === "user"){
        return res.status(404).send("You're unauthorized");
        // reject ("You're unauthorized");
      }
      resolve()
      })

  })
}


module.exports = {
  authenticate
}