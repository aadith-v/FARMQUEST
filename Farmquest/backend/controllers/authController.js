const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOtp, sendEmailOtp, sendSmsOtp } = require('../utils/otpService');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'farmquest_secret', {
    expiresIn: '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, location, bio } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create user
    const userId = await User.create({ name, email, phone, password, location, bio });

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, name, email, phone, location, bio }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, method } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await User.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate OTP based on method
    const otp = generateOtp();
    await User.setOtp(user.id, otp);

    if (method === 'email') {
      await sendEmailOtp(email, otp);
    } else if (method === 'phone') {
      await sendSmsOtp(user.phone, otp);
    }

    res.json({ 
      message: 'OTP sent successfully', 
      userId: user.id,
      method 
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const isValid = await User.verifyOtp(userId, otp);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP and generate token
    await User.clearOtp(userId);
    const token = generateToken(userId);

    // Update last active
    await User.updateProfile(userId, { last_active: new Date() });

    res.json({ 
      message: 'OTP verified successfully', 
      token,
      user: await User.findById(userId)
    });
  } catch (error) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
};