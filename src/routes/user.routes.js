const { Router } = require('express');
const { registerUser, getUser } = require('../controllers/user.controller');
const router = Router();

router.post('/create', registerUser);
router.get('/get', getUser);

module.exports = router;
