const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const foodpartnerController = require('../controller/foodpartner.controller');



const router = express.Router();


router.get('/:id',
     authMiddleware.authusermiddleware,
foodpartnerController.getPartnerProfile);







module.exports = router;