const db = require('../config/database');

class Application {
  static async create(userId, jobPostId) {
    const [result] = await db.execute(
      'INSERT INTO Application (user_id, job_post_id, applied_date, status) VALUES (?, ?, NOW(), "PENDING")',
      [userId, jobPostId]
    );
    return result.insertId;
  }

  static async findByUser(userId) {
    const [rows] = await db.execute(`
      SELECT a.*, j.title as job_title 
      FROM Application a 
      JOIN JobPost j ON a.job_post_id = j.id 
      WHERE a.user_id = ?
      ORDER BY a.applied_date DESC`, 
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Application WHERE id = ?', [id]);
    return rows[0];
  }

  static async delete(id, userId) {
    const [result] = await db.execute(
      'DELETE FROM Application WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  static async updateStatus(id, status) {
    await db.execute(
      'UPDATE Application SET status = ? WHERE id = ?',
      [status, id]
    );
  }
}

module.exports = Application;