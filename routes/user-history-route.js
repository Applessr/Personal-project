const express = require('express');
const vocabularyController = require('../controllers/vocabulary-controller');

const router = express.Router()


router.get('/',(req,res)=> {res.json({message: 'hi history'})});
router.delete('/:historyId',(req,res)=> {res.json({message: 'hi delete history'})});

module.exports = router;