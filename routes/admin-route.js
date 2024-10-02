const express = require('express');
const adminController = require('../controllers/admin-controller')

const router = express.Router()


// User Management
router.get('/user-list', adminController.getUserList); 
router.patch('/user-list/:userId', adminController.updateUserRole); 

// Vocabulary Management
router.get('/vocabulary', adminController.getVocabList); 
router.post('/vocabulary', adminController.addVocabulary); 
router.put('/vocabulary/:id', adminController.updateVocabulary); 
router.delete('/vocabulary/:id', adminController.deleteVocabulary);


module.exports = router;
