const FoodPartnerModel = require('../models/foodpartner.model');
const FoodItemModel = require('../models/fooditem.model');


async function getPartnerProfile(req, res) {
  const { id } = req.params;
  try {
    const foodpartner = await FoodPartnerModel.findById(id).select('-password');
    if (!foodpartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    const foodItems = await FoodItemModel.find({ foodPartnerId: id });
    res.status(200).json({
        message: 'Partner profile retrieved successfully',
        foodpartner,
        foodItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
  getPartnerProfile,
}