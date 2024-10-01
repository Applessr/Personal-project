const express = require('express');
const userProgressController = require('../controllers/userProgress-controller');
const router = express.Router();

router.get('/', userProgressController.getAllProgress);
router.get('/:lessonId', userProgressController.getProgressByLesson);
router.patch('/:lessonId', userProgressController.updateProgress);
router.post('/', userProgressController.createProgress);

module.exports = router;