const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  try {
    // Create connection without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '@Deepu1234'
    });

    console.log('Creating database...');
    
    // Create database (use query for non-prepared statements)
    const dbName = process.env.DB_NAME || 'farmquest';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    // Switch to the database
    if (typeof connection.changeUser === 'function') {
      await connection.changeUser({ database: dbName });
    } else {
      await connection.query(`USE \`${dbName}\``);
    }
    
    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        bio TEXT,
        points INT DEFAULT 0,
        level INT DEFAULT 1,
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        otp_code VARCHAR(10),
        otp_expires TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Badges table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS badges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL,
        color VARCHAR(50) DEFAULT 'text-green-400',
        bg_color VARCHAR(50) DEFAULT 'bg-green-400/10',
        rarity ENUM('Common', 'Uncommon', 'Rare', 'Epic', 'Legendary') DEFAULT 'Common',
        points_reward INT DEFAULT 0,
        criteria JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // User badges table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_badges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        badge_id INT NOT NULL,
        earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_badge (user_id, badge_id)
      )
    `);

    // Challenges table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS challenges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category ENUM('water', 'soil', 'pest', 'crop', 'sustainability') NOT NULL,
        reward INT NOT NULL,
        difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
        icon VARCHAR(50) DEFAULT 'challenges',
        requirements JSON,
        duration INT DEFAULT 7,
        is_active BOOLEAN DEFAULT true,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // User challenges table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_challenges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        challenge_id INT NOT NULL,
        status ENUM('Not Started', 'In Progress', 'Completed', 'Failed') DEFAULT 'Not Started',
        start_date TIMESTAMP NULL,
        end_date TIMESTAMP NULL,
        progress INT DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
      )
    `);

    // Messages table (for community chat)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        message_type ENUM('text', 'image', 'system') DEFAULT 'text',
        room VARCHAR(100) DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // User stats table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        challenges_completed INT DEFAULT 0,
        helped_farmers INT DEFAULT 0,
        sustainable_methods INT DEFAULT 0,
        days_active INT DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_stats (user_id)
      )
    `);

    // Recent activities table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS recent_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        activity_type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        points_earned INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Insert sample badges
    const sampleBadges = [
      {
        name: 'First Harvest',
        description: 'Completed your first challenge.',
        icon: 'leaf',
        color: 'text-green-400',
        bg_color: 'bg-green-400/10',
        rarity: 'Common',
        points_reward: 50
      },
      {
        name: 'Community Helper',
        description: 'Helped 5 other farmers.',
        icon: 'users',
        color: 'text-blue-400',
        bg_color: 'bg-blue-400/10',
        rarity: 'Uncommon',
        points_reward: 100
      },
      {
        name: 'Eco-Warrior',
        description: 'Used 3 sustainable methods.',
        icon: 'zap',
        color: 'text-yellow-400',
        bg_color: 'bg-yellow-400/10',
        rarity: 'Rare',
        points_reward: 150
      },
      {
        name: 'Master Gardener',
        description: 'Reached Level 15.',
        icon: 'trophy',
        color: 'text-purple-400',
        bg_color: 'bg-purple-400/10',
        rarity: 'Epic',
        points_reward: 200
      }
    ];

    for (const badge of sampleBadges) {
      await connection.execute(
        'INSERT IGNORE INTO badges (name, description, icon, color, bg_color, rarity, points_reward) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [badge.name, badge.description, badge.icon, badge.color, badge.bg_color, badge.rarity, badge.points_reward]
      );
    }

    // Insert sample challenges
    const sampleChallenges = [
      {
        title: 'Water Conservation Challenge',
        description: 'Implement a drip irrigation system to reduce water usage by 20%.',
        category: 'water',
        reward: 150,
        difficulty: 'Medium',
        icon: 'water'
      },
      {
        title: 'Organic Composting',
        description: 'Create your own organic compost pile and use it to fertilize one field.',
        category: 'soil',
        reward: 100,
        difficulty: 'Easy',
        icon: 'leaf'
      },
      {
        title: 'Pest Management',
        description: 'Introduce beneficial insects to control pests without chemical pesticides.',
        category: 'pest',
        reward: 200,
        difficulty: 'Hard',
        icon: 'bug'
      }
    ];

    for (const challenge of sampleChallenges) {
      await connection.execute(
        'INSERT IGNORE INTO challenges (title, description, category, reward, difficulty, icon) VALUES (?, ?, ?, ?, ?, ?)',
        [challenge.title, challenge.description, challenge.category, challenge.reward, challenge.difficulty, challenge.icon]
      );
    }

    console.log('✅ Database and tables created successfully!');
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

createDatabase();