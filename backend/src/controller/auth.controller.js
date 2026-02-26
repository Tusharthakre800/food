const UserModel = require('../models/user.model');
const FoodPartnerModel = require('../models/foodpartner.model');
const EmailService = require('../services/email.service');



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



async function registerUser(req, res) {
  const { fullname, email, password } = req.body;
  const isUserAlreadyRegistered = await UserModel.findOne({ email });
  if (isUserAlreadyRegistered) {
    return res.status(400).json({ message: 'User already registered' });
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ fullname, email, password: hashedPassword });

  const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, { expiresIn: '1h' } );
  res.cookie('token', token, { httpOnly: true });
  res.status(201).json({ message: 'User registered successfully', token });

  await EmailService.sendRegisterationeEmail(user.email, user.fullname);
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, { expiresIn: '1h' } );
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'User logged in successfully', token });
    await EmailService.sendLoginEmail(user.email, user.fullname);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
}

async function logoutUser(req, res) {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function forgotPasswordUser(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Save token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // In a real app, send email here. For now, return the link.
    // Construct reset URL (assuming frontend runs on port 5173 or similar)
    // We'll return the token so the frontend can display a "magic link" or similar for testing
    
    // NOTE: In production, you would use nodemailer to send this link:
    // const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    res.status(200).json({ 
      message: 'Password reset link generated', 
      resetToken: resetToken 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function resetPasswordUser(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function registerFoodPartner(req, res) {
  const { fullname, email, password, address, phone } = req.body;
  const isFoodPartnerAlreadyRegistered = await FoodPartnerModel.findOne({ email });
  if (isFoodPartnerAlreadyRegistered) {
    return res.status(400).json({ message: 'Food partner already registered' });
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await FoodPartnerModel.create({ fullname, email, password: hashedPassword, address, phone });

  const token = jwt.sign({foodPartnerId: foodPartner._id},process.env.JWT_SECRET, { expiresIn: '1h' } );
  res.cookie('token', token, { httpOnly: true });
  res.status(200).json({ message: 'Food partner registered successfully', token });
}

async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;
    const foodPartner = await FoodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({foodPartnerId: foodPartner._id},process.env.JWT_SECRET, { expiresIn: '1h' } );
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Food partner logged in successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function logoutFoodPartner(req, res) {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Food partner logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function forgotPasswordFoodPartner(req, res) {
  try {
    const { email } = req.body;
    const foodPartner = await FoodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Save token to food partner
    foodPartner.resetPasswordToken = resetToken;
    foodPartner.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await foodPartner.save();

    res.status(200).json({ 
      message: 'Password reset link generated', 
      resetToken: resetToken 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function resetPasswordFoodPartner(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const foodPartner = await FoodPartnerModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!foodPartner) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    foodPartner.password = hashedPassword;
    foodPartner.resetPasswordToken = undefined;
    foodPartner.resetPasswordExpires = undefined;
    await foodPartner.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  forgotPasswordUser,
  resetPasswordUser,
  forgotPasswordFoodPartner,
  resetPasswordFoodPartner
}