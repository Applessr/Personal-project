const express = require('express');
const adminController = require('../controllers/admin-controller')

const router = express.Router()


// User Management
router.get('/user-list', adminController.getUserList); 
router.patch('/user-list/:userId', adminController.updateUserRole); 

// Vocabulary Management
router.get('/vocabulary', adminController.getVocabList); 
router.post('/vocabulary', adminController.addVocabulary); 
router.patch('/vocabulary/:vocabularyId', adminController.updateVocabulary); 
router.delete('/vocabulary/:vocabularyId', adminController.deleteVocabulary);


module.exports = router;
