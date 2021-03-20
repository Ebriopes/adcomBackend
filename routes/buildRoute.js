const buildControll = require('../controllers/buildController');
const express = require('express');
const router = express.Router();

router.post('/build', buildControll.createBuild);
router.get('/builds', buildControll.getBuilds);
router.get('/build', buildControll.getBuild);
router.put('/build', buildControll.updateBuild);
router.delete('/build', buildControll.deleteBuild);

module.exports = router;
