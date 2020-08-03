const express		= require('express');
const userControll	=require('../controllers/userController');
const router		= express.Router();

router.get('/users',		userControll.getUsers);
router.get('/users/:id',	userControll.getUser);
router.post('/users',		userControll.createUser);
router.put('/users:id',		userControll.updateUser);
router.delete('/users:id',	userControll.deleteUser);

module.exports = router;