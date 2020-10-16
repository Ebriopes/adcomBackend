const buildControll	= require('../controllers/buildController');
const express		= require('express');
const router		= express.Router();

router.post('/users/:id/builds',		buildControll.createBuild);
router.get('/users/:id/builds',			buildControll.getBuilds);
router.get('/users/:id/build/:build',	buildControll.getBuild);
router.put('/users/:id/build/:build',	buildControll.updateBuild);
router.delete('/users/:id/build/:build',buildControll.deleteBuild);

module.exports = router;
