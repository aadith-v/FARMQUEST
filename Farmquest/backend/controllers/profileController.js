const User = require('../models/User');
const { pool } = require('../config/database');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user badges
    const [badges] = await pool.execute(`
      SELECT b.*, ub.earned_date 
      FROM user_badges ub 
      JOIN badges b ON ub.badge_id = b.id 
      WHERE ub.user_id = ?
    `, [userId]);

    // Get user stats
    const [stats] = await pool.execute(
      'SELECT * FROM user_stats WHERE user_id = ?',
      [userId]
    );

    // Get recent achievements
    const [achievements] = await pool.execute(`
      SELECT * FROM recent_activities 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 5
    `, [userId]);

    // Get user challenges
    const [challenges] = await pool.execute(`
      SELECT c.*, uc.status, uc.progress, uc.start_date, uc.end_date
      FROM user_challenges uc
      JOIN challenges c ON uc.challenge_id = c.id
      WHERE uc.user_id = ?
      ORDER BY uc.updated_at DESC
    `, [userId]);

    res.json({
      user: {
        ...user,
        joinDate: user.join_date,
        lastActive: user.last_active
      },
      badges,
      stats: stats[0] || {
        challengesCompleted: 0,
        helpedFarmers: 0,
        sustainableMethods: 0,
        daysActive: 0
      },
      recentAchievements: achievements,
      challenges
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, location, bio } = req.body;

    await User.updateProfile(userId, { name, location, bio });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};