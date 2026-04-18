const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, phone, password, location, bio } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [result] = await pool.execute(
      `INSERT INTO users (name, email, phone, password, location, bio) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, hashedPassword, location, bio]
    );
    
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, phone, location, bio, points, level, join_date, last_active FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async updateProfile(id, updateData) {
    const fields = [];
    const values = [];
    
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });
    
    values.push(id);
    
    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  static async updatePoints(userId, points) {
    await pool.execute(
      'UPDATE users SET points = points + ? WHERE id = ?',
      [points, userId]
    );
  }

  static async setOtp(userId, otpCode) {
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await pool.execute(
      'UPDATE users SET otp_code = ?, otp_expires = ? WHERE id = ?',
      [otpCode, expires, userId]
    );
  }

  static async verifyOtp(userId, otpCode) {
    const [rows] = await pool.execute(
      'SELECT otp_code, otp_expires FROM users WHERE id = ? AND otp_code = ? AND otp_expires > NOW()',
      [userId, otpCode]
    );
    return rows.length > 0;
  }

  static async clearOtp(userId) {
    await pool.execute(
      'UPDATE users SET otp_code = NULL, otp_expires = NULL WHERE id = ?',
      [userId]
    );
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;