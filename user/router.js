const { login, authenticate } = require('../auth/index');
const { findAllUsers, findUser, findMe, deleteMe, patchMe, createUser } = require('./controller');

const router = require('express').Router();

router.post('/', createUser);

router.get('/', findAllUsers);

router.get('/:username/user', findUser);

router.post('/login', login);

router.use(authenticate);

router.route('/me')
      .get(findMe)
      .patch(patchMe)
      .delete(deleteMe)


module.exports = router;