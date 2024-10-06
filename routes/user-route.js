const express = require('express');
const userController = require('../controllers/user-controller');
const lessonController = require('../controllers/lesson-controller');
const vocabularyController = require('../controllers/vocabulary-controller');
const searchController = require('../controllers/search-controller');
const authenticate = require('../middlewares/authentication');
const favoriteController = require('../controllers/favorite-controller');


const router = express.Router()

router.get('/',userController.getUserInfo);
router.patch('/',userController.updateUserInfo);
router.delete('/',userController.deleteUser);


// Lesson
router.get('/lessons', lessonController.getAllLessons); 
router.get('/lessons/:lessonsId', lessonController.getLessonById);

// Vocabulary
router.get('/vocabulary', vocabularyController.getVocabCategory); 
router.get('/vocabulary/:vocabularyId', vocabularyController.getVocabCategoryId);

// Search history
router.get('/user-history', searchController.getSearch);
router.post('/user-history', searchController.createSearch);
router.delete('/user-history/:historyId',searchController.deleteSearch);

// Favorite vocab
router.get('/user-favorite', favoriteController.getUserFavorite);
router.post('/user-favorite/:vocabularyId',favoriteController.addUserFavorite);
router.delete('/user-favorite/:favoriteId',favoriteController.deleteUserFavorite);


module.exports = router;