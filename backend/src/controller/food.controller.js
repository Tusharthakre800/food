const foodModel = require('../models/fooditem.model');
const storageService = require('../services/storage.service');
const likeModel = require('../models/like.model');
const saveModel = require('../models/save.model');
const commentModel = require('../models/comment.model');
const foodPartnerModel = require('../models/foodpartner.model');
const orderModel = require('../models/order.model');
const discountModel = require('../models/discount.model');



const { v4: uuidv4 } = require('uuid');


async function createFoodItem(req, res) {
    try {
        if (!req.foodPartner) {
            return res.status(401).json({ message: 'please login first' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a video/image for the food item' });
        }

        const fileuploadresult = await storageService.uploadFile(req.file.buffer, uuidv4());
        
        const foodItem = await foodModel.create({
            name: req.body.name,
            price: req.body.price,
            video: fileuploadresult.url,
            description: req.body.description,
            category: req.body.category,
            foodPartnerId: req.foodPartner._id,
        });
      
        res.status(201).json({ message: 'food item created successfully', food: foodItem });
    } catch (error) {
        console.error("Error in createFoodItem:", error);
        res.status(500).json({ message: 'Error creating food item', error: error.message });
    }
}

/**
 * Searches for food items based on a query string
 * Searches in name, description, and category
 */
async function searchFoodItems(req, res) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const userId = req.user ? req.user._id : null;
        
        // Case-insensitive search using regex
        const searchRegex = new RegExp(q, 'i');
        
        const foodItems = await foodModel.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { category: searchRegex }
            ]
        }).lean();

        // If user is logged in, add like/save status
        let results = foodItems;
        if (userId) {
            const userLikes = await likeModel.find({ userId: userId });
            const likedFoodIds = new Set(userLikes.map(like => like.food.toString()));

            const userSaves = await saveModel.find({ user: userId });
            const savedFoodIds = new Set(userSaves.map(save => save.food.toString()));

            results = foodItems.map(item => ({
                ...item,
                isLiked: likedFoodIds.has(item._id.toString()),
                isSaved: savedFoodIds.has(item._id.toString())
            }));
        }

        res.status(200).json({ 
            message: `Found ${results.length} items matching "${q}"`, 
            foodItems: results 
        });
    } catch (error) {
        console.error("Error in searchFoodItems:", error);
        res.status(500).json({ message: 'Error searching food items', error: error.message });
    }
}

async function getFoodItems(req, res) {
    try {
        const userId = req.user._id;
        const foodItems = await foodModel.find().lean();
        
        const userLikes = await likeModel.find({ userId: userId });
        const likedFoodIds = new Set(userLikes.map(like => like.food.toString()));

        const userSaves = await saveModel.find({ user: userId });
        const savedFoodIds = new Set(userSaves.map(save => save.food.toString()));

        const foodItemsWithLikeStatus = foodItems.map(item => ({
            ...item,
            isLiked: likedFoodIds.has(item._id.toString()),
            isSaved: savedFoodIds.has(item._id.toString())
        }));

        res.status(200).json({ message: 'food items fetched successfully', foodItems: foodItemsWithLikeStatus });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching food items', error: error.message });
    }
}

async function likeFoodItem(req, res) {
    const { foodId } = req.body;
    const userId = req.user._id;

    const existingLike = await likeModel.findOne({ userId: userId, food: foodId });
    if (existingLike) {
        await likeModel.deleteOne({ userId: userId, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
        return res.status(200).json({ message: 'food item unliked successfully' });
    }

    const like = await likeModel.create({
        userId: userId,
        food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    res.status(201).json({ message: 'food item liked successfully', like });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const userId = req.user;

    const existingSave = await saveModel.findOne({ user: userId, food: foodId });
    if (existingSave) {
        await saveModel.deleteOne({ user: userId, food: foodId });
        return res.status(200).json({ message: 'food item unsaved successfully' });
    }

    const save = await saveModel.create({
        user: userId,
        food: foodId,
    });
    res.status(201).json({ message: 'food item saved successfully', save });
}


async function postComment(req, res) {
    const { content, foodId } = req.body;
    const userId = req.user;

    const comment = await commentModel.create({
        content,
        user: userId,
        foodItem: foodId,
    });
    
    // Update comment count
    await foodModel.findByIdAndUpdate(foodId, { $inc: { commentCount: 1 } });
    
    // Populate user details for immediate display
    await comment.populate('user', 'username profilePicture fullname');

    res.status(201).json({ message: 'comment posted successfully', comment });
}

async function getComments(req, res) {
    const { foodId } = req.params;
    const comments = await commentModel.find({ foodItem: foodId }).populate('user', 'username profilePicture');
    res.status(200).json({ message: 'comments fetched successfully', comments });
}   

async function getSavedFoodItems(req, res) {
    const userId = req.user._id;
    const savedItems = await saveModel.find({ user: userId }).populate('food').lean();

    const userLikes = await likeModel.find({ userId: userId });
    const likedFoodIds = new Set(userLikes.map(like => like.food.toString()));

    const savedItemsWithStatus = savedItems.map(item => {
        if (item.food) {
            item.food.isLiked = likedFoodIds.has(item.food._id.toString());
            item.food.isSaved = true;
        }
        return item;
    });

    res.status(200).json({ message: 'saved food items fetched successfully', savedItems: savedItemsWithStatus });
}

async function getPartnerProfile(req, res) {
    const foodPartnerId = req.foodPartner._id;
    const profile = await foodPartnerModel.findById(foodPartnerId);
    if (!profile) {
        return res.status(404).json({ message: 'Partner profile not found' });
    }

    const foodItems = await foodModel.find({ foodPartnerId: foodPartnerId });

    res.status(200).json({ message: 'Partner profile fetched successfully', profile, foodItems });
}

async function deleteFoodItem(req, res) {
    try {
        const { id } = req.params;
        const foodPartnerId = req.foodPartner._id;

        const foodItem = await foodModel.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.foodPartnerId.toString() !== foodPartnerId.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting food item', error: error.message });
    }
}

async function updateFoodItem(req, res) {
    try {
        const { id } = req.params;
        const foodPartnerId = req.foodPartner._id;

        const foodItem = await foodModel.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.foodPartnerId.toString() !== foodPartnerId.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        const updates = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
        };

        if (req.file) {
            const { v4: uuidv4 } = require('uuid');
            const fileuploadresult = await storageService.uploadFile(req.file.buffer, uuidv4());
            updates.video = fileuploadresult.url;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({ message: 'Food item updated successfully', food: updatedFood });
    } catch (error) {
        res.status(500).json({ message: 'Error updating food item', error: error.message });
    }
}

async function createOrder(req, res) {
    try {
        const { foodPartnerId, items, totalPrice, address } = req.body;
        const userId = req.user._id;

        const order = await orderModel.create({
            userId,
            foodPartnerId,
            items,
            totalPrice,
            address,
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
}

async function getOrderList(req, res) {
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({ userId }).populate('foodPartnerId', 'name profilePicture');
        res.status(200).json({ message: 'Order list fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order list', error: error.message });
    }
}

async function applyDiscountCode(req, res) {
    try {
        const { discountCode } = req.body;

        if (discountCode === 'tusharthakre800') {
             const discountAmount = Math.floor(Math.random() * 2) + 5; // Random discount between 10 and 20
             return res.status(200).json({ 
                 message: 'Discount code applied successfully', 
                 discount: {
                     code: 'tusharthakre800',
                     discountAmount: discountAmount,
                     minOrderAmount: 0
                 } 
             });
        }

        const discount = await discountModel.findOne({ code: discountCode });
        if (!discount) {
            return res.status(404).json({ message: 'Discount code not found' });
        }
        res.status(200).json({ message: 'Discount code applied successfully', discount });
    } catch (error) {
        res.status(500).json({ message: 'Error applying discount code', error: error.message });
    }
}



module.exports = {
    createFoodItem,
    getFoodItems,
    likeFoodItem,
    saveFood,
    postComment,
    getComments,
    getSavedFoodItems,
    getPartnerProfile,
    deleteFoodItem,
    updateFoodItem,
    createOrder,
    getOrderList,
    applyDiscountCode,
    searchFoodItems,
}
