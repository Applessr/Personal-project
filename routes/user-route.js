const express = require('express');
const userController = require('../controllers/user-controller');
const lessonController = require('../controllers/lesson-controller');
const vocabularyController = require('../controllers/vocabulary-controller');
const searchController = require('../controllers/search-controller');
const authenticate = require('../middlewares/authentication');
const favoriteController = require('../controllers/favorite-controller');


const router = express.Router()

router.get('/', authenticate,userController.getUserInfo);
router.patch('/',authenticate,userController.updateUserInfo);
router.delete('/',authenticate,userController.deleteUser);


// Lesson
router.get('/lessons', authenticate, lessonController.getAllLessons); 
router.get('/lessons/:lessonsId', authenticate, lessonController.getLessonById);

// Vocabulary
router.get('/vocabulary',authenticate, vocabularyController.getVocabCategory); 
router.get('/allVocabulary', vocabularyController.getAllVocab); 
router.get('/vocabulary/:vocabularyId', authenticate, vocabularyController.getVocabCategoryId);

// Search history
router.get('/user-history', authenticate, searchController.getSearch);
router.post('/user-history', authenticate, searchController.createSearch);
router.delete('/user-history/:historyId', authenticate,searchController.deleteSearch);

// Favorite vocab
router.get('/user-favorite', authenticate, favoriteController.getUserFavorite);
router.post('/user-favorite/:vocabularyId', authenticate,favoriteController.addUserFavorite);
router.delete('/user-favorite/:vocabularyId', authenticate,favoriteController.deleteUserFavorite);


module.exports = router;