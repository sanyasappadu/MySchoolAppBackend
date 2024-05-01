const express = require('express');
const router = express.Router();
const markController = require('../controllers/mark');

router.post('/marks', markController.createMark);
router.post('/marksOfStudents', markController.createMarks);
router.put('/marks/:idnumber/:class/:unitTest', markController.updateMark);
router.get('/marks/:idnumber/:class/:unitTest', markController.getMark);

module.exports = router;
