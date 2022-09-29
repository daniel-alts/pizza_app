const express = require('express');

const User = require('./Users/userModel');


async function authenticate (req, res){

    const result = await User.User.find({'username': req.body.username, 'password': req.body.password });
   
    return new Promise((resolve, reject) => {

       

    if(result.length == 0)
    {

    reject('Authentication failed! Check your username or password');
    }

    resolve(result)
    console.log(req.body);

    
}).then(() => { console.log("success!")


res.redirect(307, '/order');
}
)
.catch((err) => {
res.send(err)
})

}

module.exports = {authenticate}