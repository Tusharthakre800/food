const express = require('express');
const foodController = require('../controller/food.controller');
const authMiddleware = require('../middleware/auth.middleware');

// const commentModel = require('../models/comment.model');
// const saveModel = require('../models/save.model');



const multer = require('multer');

const router = express.Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
});



router.post('/', authMiddleware.authfoodpartnermiddleware, upload.single('video'), foodController.createFoodItem);

router.get('/', authMiddleware.authusermiddleware, foodController.getFoodItems);

router.post('/like', authMiddleware.authusermiddleware, foodController.likeFoodItem);

router.post('/save', authMiddleware.authusermiddleware, foodController.saveFood);

router.post('/comment', authMiddleware.authusermiddleware, foodController.postComment);

router.get('/comments/:foodId', authMiddleware.authusermiddleware, foodController.getComments);

router.get('/saved', authMiddleware.authusermiddleware, foodController.getSavedFoodItems);

router.get('/profile', authMiddleware.authfoodpartnermiddleware, foodController.getPartnerProfile);

router.delete('/:id', authMiddleware.authfoodpartnermiddleware, foodController.deleteFoodItem);

router.put('/:id', authMiddleware.authfoodpartnermiddleware, upload.single('video'), foodController.updateFoodItem);

router.post('/order', authMiddleware.authusermiddleware, foodController.createOrder);

router.get('/order-list', authMiddleware.authusermiddleware, foodController.getOrderList);

router.get('/search', authMiddleware.authusermiddleware, foodController.searchFoodItems);

router.post('/discount', authMiddleware.authusermiddleware, foodController.applyDiscountCode);


module.exports = router;