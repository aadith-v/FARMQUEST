const express = require('express');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const challengesController = require('../controllers/challengesController');
const communityController = require('../controllers/communityController');

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/verify-otp', authController.verifyOtp);

// Profile routes
router.get('/profile', auth, profileController.getProfile);
router.put('/profile', auth, profileController.updateProfile);

// Challenges routes
router.get('/challenges', auth, challengesController.getChallenges);
router.post('/challenges/start', auth, challengesController.startChallenge);
router.put('/challenges/progress', auth, challengesController.updateChallengeProgress);
router.post('/challenges/complete', auth, challengesController.completeChallenge);

// Community routes
router.get('/community/messages', auth, communityController.getMessages);
router.post('/community/messages', auth, communityController.sendMessage);
router.get('/community/leaderboard', auth, communityController.getLeaderboard);
router.get('/community/activities', auth, communityController.getRecentActivities);

module.exports = router;