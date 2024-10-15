const express = require('express');
const subscriptionController = require('../controllers/subscription-controller');
const router = express.Router();

router.get('/check', subscriptionController.checkSubscription);
router.post('/subscribe', subscriptionController.createSubscription);
router.post('/cancel', subscriptionController.cancelSubscription);
router.post('/renew', subscriptionController.renewSubscription);
router.post('/charge-credit', subscriptionController.createCharge);
router.post('/charge-bank', subscriptionController.createBankCharge);


module.exports = router;