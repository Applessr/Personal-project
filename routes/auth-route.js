const express = require('express');
const authController = require('../controllers/auth-controller');
const {registerValidator, loginValidator} = require('../middlewares/validator')
const authenticate = require('../middlewares/authentication');

const router = express.Router()

router.post('/register',registerValidator,authController.register);

router.post('/login',loginValidator,authController.login);

router.post('/login/google',authController.loginGoogle);

router.post('/forget-password',authController.forgetPassword);

router.post('/reset-password',authController.resetPassword);

router.get('/current-user', authenticate,authController.currentUser);

module.exports = router;