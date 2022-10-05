const UserModel = require("./userModel");

function authenticate(req, res) {
  return new Promise ((resolve, reject) => {

    const body = req.body.user;

    if (!body) {
          reject("No username or password provided")
    }

    const username = body.username;
    const password = body.password;

    UserModel.find({username: username}, (err, foundResults) => {  
    
      if (err){
        console.log(err);
        reject("User not found! Please sign up!")
        return err
      }

      if (!foundResults){
        reject("User not found! Please sign up!")
      }
        
      if (foundResults[0].password !== password){
          reject("Invalid password!")
      } 

      resolve()
    })


  })
}

module.exports = authenticate;
