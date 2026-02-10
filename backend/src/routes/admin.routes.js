const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/login', AdminController.loginAdmin);

router.get('/users', authMiddleware.authadminmiddleware, AdminController.getAllUsers);

router.get('/allfoodpartners', authMiddleware.authadminmiddleware, AdminController.getAllFoodpartners);

router.get('/allorders', authMiddleware.authadminmiddleware, AdminController.getAllOrders);

router.get('/allvideocomments', authMiddleware.authadminmiddleware, AdminController.getAllVideoComments);

router.delete('/deletevideocomment/:id', authMiddleware.authadminmiddleware, AdminController.deleteVideoComment);


module.exports = router;