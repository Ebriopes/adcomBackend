const express			= require('express');
const userControll		= require('../controllers/userController');
const {validateToken}	= require('../middlewares')
const router			= express.Router();

router.post('/users',		userControll.createUser);
router.post('/users/login',	userControll.login);

router.use(validateToken);
router.get('/users',		userControll.getUsers);
router.get('/users/:id',	userControll.getUser);
router.put('/users:id',		userControll.updateUser);
router.delete('/users:id',	userControll.deleteUser);

module.exports = router;