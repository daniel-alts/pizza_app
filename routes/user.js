const express = require('express');
const  mongoose  = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('./models/user');
router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email exists'
            });
        } else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                   return res.status(500).json({
                         error: err
                        });
                    } else {
                        const user = new User({
                         _id: new mongoose.Types.ObjectId(),
                         email: req.body.email,
                         password: hash
                    }) 
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            error: err
                        });
                    })
                    .catch( err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });   
        }
    })
  
        }
   });
});

router.post('/login', (req, res, next) => {
    user.find({ email: req.body.email})
    .exec()
    .then(user => {

        return res.status(401).json({
            message: "Auth Failed"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;
