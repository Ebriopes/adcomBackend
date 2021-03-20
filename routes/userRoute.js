const express = require('express');
const userControll = require('../controllers/userController');
const { validateToken } = require('../middlewares');
const router = express.Router();

router.post('/user', userControll.createUser);
router.post('/login', userControll.login);

router.use(validateToken);
router.get('/users', userControll.getUsers);
router.get('/user', userControll.getUser);
router.put('/user', userControll.updateUser);
router.delete('/user', userControll.deleteUser);

module.exports = router;
