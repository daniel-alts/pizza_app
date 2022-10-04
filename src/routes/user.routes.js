const { Router } = require('express');
const { registerUser } = require('../controllers/user.controller');
const router = Router();

router.post('/create', registerUser);

module.exports = router;
