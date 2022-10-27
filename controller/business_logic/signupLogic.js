const { sign } = require('jsonwebtoken');
const { User } = require('../../model/Models/userModel');

const maxAge = 3 * 24 * 60 * 60 * 1000;
function createToken(id) {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge / 1000,
  });
}

async function signupLogic(req, res) {
  // try {} catch () {}
  try {
    /* 
    STEPS:
    ==> Create an object from the payload of the request, using the mongoose model.
    ==> Write the object to the database [ objectName.save() ]. 
    ==> Create jwt token and set-cookie to be sent to the client.
    ==> Send a response, to the client res.send().
    */
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      deliveryAddress: req.body.deliveryAddress,
      date: req.body.date,
    });

    console.log(newUser);

    await newUser.save();

    console.log(newUser);

    const token = createToken(newUser._id);
    res.cookie('bolanle', token, { maxAge }); // I've used bolanle instead of jwt, purely for learning purpose

    console.log(newUser);

    res
      .status(201)
      .send(
        `<h4>Congratulations, your account has been created successfully! :) </h4>`
      );
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err.message);
  }
}

module.exports = { signupLogic };
