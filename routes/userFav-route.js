const express = require('express');
const vocabularyController = require('../controllers/vocabulary-controller');

const router = express.Router()


router.get('/',(req,res)=> {res.json({message: 'hi get vocab'})});
router.delete('/:favoriteId',(req,res)=> {res.json({message: 'hi delete vocab'})});

module.exports = router;