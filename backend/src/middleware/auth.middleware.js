const foodPartnerModel = require('../models/foodpartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


async function authfoodpartnermiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'please login first' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.foodPartnerId);
    if (!foodPartner) {
      return res.status(401).json({ message: 'please login first' });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'please login first' });
  }
}


async function authusermiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'please login first' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'please login first' });
  }
}

async function authadminmiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if role is admin
      if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }

      const user = await userModel.findById(decoded.userId);
      if (!user || user.role !== 'admin') {
          return res.status(403).json({ message: 'Forbidden: Not an admin' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

module.exports = {
    authfoodpartnermiddleware,
    authusermiddleware,
    authadminmiddleware
}
