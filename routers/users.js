const express = require('express');
const userController = require('../controllers/user')

// ***************SET UP ROUTER, CREATE ENDPOINTS FOR USERS ********************//

const router = express.Router()

router.post('/', userController.createUser )
router.get('/', userController.getUsers)

module.exports = router