const { pool } = require('../config/database');

exports.getChallenges = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [challenges] = await pool.execute(`
      SELECT c.*, uc.status, uc.progress 
      FROM challenges c
      LEFT JOIN user_challenges uc ON c.id = uc.challenge_id AND uc.user_id = ?
      WHERE c.is_active = true
      ORDER BY c.created_at DESC
    `, [userId]);

    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
};

exports.startChallenge = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { challengeId } = req.body;

    // Check if already started
    const [existing] = await pool.execute(
      'SELECT * FROM user_challenges WHERE user_id = ? AND challenge_id = ?',
      [userId, challengeId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Challenge already started' });
    }

    // Start challenge
    await pool.execute(
      `INSERT INTO user_challenges (user_id, challenge_id, status, start_date) 
       VALUES (?, ?, 'In Progress', NOW())`,
      [userId, challengeId]
    );

    res.json({ message: 'Challenge started successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start challenge' });
  }
};

exports.updateChallengeProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { challengeId, progress, notes } = req.body;

    await pool.execute(
      `UPDATE user_challenges SET progress = ?, notes = ?, updated_at = NOW() 
       WHERE user_id = ? AND challenge_id = ?`,
      [progress, notes, userId, challengeId]
    );

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

exports.completeChallenge = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { challengeId } = req.body;

    // Get challenge reward
    const [challenge] = await pool.execute(
      'SELECT reward FROM challenges WHERE id = ?',
      [challengeId]
    );

    if (challenge.length === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Update challenge status and award points
    await pool.execute(
      `UPDATE user_challenges SET status = 'Completed', end_date = NOW(), progress = 100 
       WHERE user_id = ? AND challenge_id = ?`,
      [userId, challengeId]
    );

    await pool.execute(
      'UPDATE users SET points = points + ? WHERE id = ?',
      [challenge[0].reward, userId]
    );

    // Add to recent activities
    await pool.execute(
      `INSERT INTO recent_activities (user_id, activity_type, description, points_earned) 
       VALUES (?, 'challenge_completed', 'Completed a challenge', ?)`,
      [userId, challenge[0].reward]
    );

    res.json({ 
      message: 'Challenge completed successfully', 
      pointsEarned: challenge[0].reward 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete challenge' });
  }
};