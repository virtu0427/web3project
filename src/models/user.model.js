const db = require('../config/database');

class User {
  static async create(username, email, password) {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [username, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateProfile(id, username, email) {
    await db.execute(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, id]
    );
  }
}

module.exports = User;