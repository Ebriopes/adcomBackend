const buildControll	= require('../controllers/buildController');
const express		= require('express');
const router		= express.Router();

router.get('/users/:id/build',		buildControll.getBuild);
router.put('/users/:id/build',		buildControll.updateBuild);
router.get('/users/:id/builds',		buildControll.getBuilds);
router.post('/users/:id/builds',	buildControll.createBuild);
router.delete('/users/:id/build',	buildControll.deleteBuild);

module.exports = router;
