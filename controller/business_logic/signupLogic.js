const { User } = require('../../model/Models/userModel');

async function signupLogic(req, res) {
  // try {} catch () {}
  try {
    /* 
    STEPS:
    ==> Create an object from the payload of the request, using the mongoose model.
    ==> Write the object to the database [ objectName.save() ]. 
    ==> Send the said object as a response, to the client res.send().
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

    res
      .status(201)
      .send(
        `<h4>Congratulations, your account has been created successfully! :) </h4>`
      );

    console.log(newUser);
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err.message);
  }
}

module.exports = { signupLogic };
