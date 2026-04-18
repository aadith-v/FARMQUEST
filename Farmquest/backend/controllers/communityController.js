const { pool } = require('../config/database');

exports.getMessages = async (req, res) => {
  try {
    const { room = 'general', limit = 50 } = req.query;

    const [messages] = await pool.execute(`
      SELECT m.*, u.name as user_name 
      FROM messages m 
      JOIN users u ON m.user_id = u.id 
      WHERE m.room = ? 
      ORDER BY m.created_at DESC 
      LIMIT ?
    `, [room, parseInt(limit)]);

    res.json(messages.reverse()); // Return in chronological order
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { content, room = 'general', messageType = 'text' } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO messages (user_id, content, message_type, room) 
       VALUES (?, ?, ?, ?)`,
      [userId, content, messageType, room]
    );

    // Get the created message with user info
    const [message] = await pool.execute(`
      SELECT m.*, u.name as user_name 
      FROM messages m 
      JOIN users u ON m.user_id = u.id 
      WHERE m.id = ?
    `, [result.insertId]);

    res.json(message[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const [leaderboard] = await pool.execute(`
      SELECT u.id, u.name, u.points, u.level, COUNT(ub.badge_id) as badge_count
      FROM users u
      LEFT JOIN user_badges ub ON u.id = ub.user_id
      GROUP BY u.id, u.name, u.points, u.level
      ORDER BY u.points DESC
      LIMIT 10
    `);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

exports.getRecentActivities = async (req, res) => {
  try {
    const [activities] = await pool.execute(`
      SELECT ra.*, u.name as user_name 
      FROM recent_activities ra 
      JOIN users u ON ra.user_id = u.id 
      ORDER BY ra.created_at DESC 
      LIMIT 10
    `);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent activities' });
  }
};