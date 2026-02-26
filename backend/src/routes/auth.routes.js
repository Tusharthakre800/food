const express = require('express');
const authController = require('../controller/auth.controller');



const router = express.Router();

// User routes
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);
router.post('/user/forgot-password', authController.forgotPasswordUser);
router.post('/user/reset-password/:token', authController.resetPasswordUser);

// Food partner routes
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.post('/food-partner/logout', authController.logoutFoodPartner);
router.post('/food-partner/forgot-password', authController.forgotPasswordFoodPartner);
router.post('/food-partner/reset-password/:token', authController.resetPasswordFoodPartner);


module.exports = router;