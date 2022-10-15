const express = require('express');
const  mongoose  = require('mongoose');
const router = express.Router();

//const Product = require('./models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    . save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    // product.save().then(result => {
    //     console.log(result);
    // })
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    // Product.findById(id)
    // .exec()
    // .then(doc => {
    //     console.log(doc);
    //     res.status(200).json(doc);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({error: err});
    // });
    if (id === 'special') {
        res.status(200).json({
            message: 'You ordered the pizza special',
            id: id
        });
    } else {
        if (id === 'pepperoni'){
            res.status(200).json({
                message: 'You have ordered the Pepperoni pizza',
                id: id
            });
        } else {
            if (id === 'suya'){
                res.status(200).json({
                    message: 'You ordered the Suya Pizza',
                    id: id
                });
            }else {
                if (id === 'vegan'){
                    res.status(200).json({
                        message: 'You ordered the Vegan Pizza',
                        id: id
                    })
                }
            }
        }
    } 
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'product updated!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'product deleted!'
    });
});

module.exports = router;