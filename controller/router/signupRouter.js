const { Router } = require('express');
const { signupLogic } = require('../business_logic/signupLogic');

const router = Router();

router.post('/', signupLogic);

module.exports = { router };
