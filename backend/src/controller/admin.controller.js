const UserModel = require('../models/user.model');
const FoodpartnerModel = require('../models/foodpartner.model');
const OrderModel = require('../models/order.model');
const CommentModel = require('../models/comment.model');



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '12h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ 
            message: 'Admin logged in successfully', 
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: 'user' }).select('-password').sort({ timestamp: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllFoodpartners = async (req, res) => {
    try {
        const foodpartners = await FoodpartnerModel.find().select('-password').sort({ timestamp: -1 });
        res.status(200).json(foodpartners);
    } catch (error) {
        console.error("Get All Foodpartners Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().select('-password').sort({ timestamp: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get All Orders Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllVideoComments = async (req, res) => {
    try {
        const videoComments = await CommentModel.find().select('-password').sort({ timestamp: -1 });
        res.status(200).json(videoComments);
        console.log(videoComments);
    } catch (error) {
        console.error("Get All Video Comments Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteVideoComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await CommentModel.findByIdAndDelete(id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error("Delete Video Comment Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    loginAdmin,
    getAllUsers,
    getAllFoodpartners,
    getAllOrders,
    getAllVideoComments,
    deleteVideoComment
}