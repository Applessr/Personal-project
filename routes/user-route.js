const express = require('express');
const userController = require('../controllers/user-controller');
const lessonController = require('../controllers/lesson-controller');
const vocabularyController = require('../controllers/vocabulary-controller');


const router = express.Router()

router.get('/',userController.getUserInfo);
router.patch('/',userController.updateUserInfo);
router.delete('/',userController.deleteUser);


// Lesson
router.get('/lessons', lessonController.getAllLessons); 
router.get('/lessons/:id', lessonController.getLessonById);

// Vocabulary
router.get('/vocabulary', vocabularyController.getVocabCategory); 
router.get('/vocabulary/:id', vocabularyController.getVocabCategoryId);



module.exports = router;