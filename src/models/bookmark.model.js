const db = require('../config/database');

class Bookmark {
  static async create(userId, jobPostId) {
    const [result] = await db.execute(
      'INSERT INTO Bookmark (user_id, job_post_id, created_at) VALUES (?, ?, NOW())',
      [userId, jobPostId]
    );
    return result.insertId;
  }

  static async findByUser(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(`
      SELECT b.*, j.title as job_title 
      FROM Bookmark b 
      JOIN JobPost j ON b.job_post_id = j.id 
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?`, 
      [userId, limit, offset]
    );
    
    const [totalRows] = await db.execute(
      'SELECT COUNT(*) as count FROM Bookmark WHERE user_id = ?',
      [userId]
    );
    
    return {
      bookmarks: rows,
      total: totalRows[0].count,
      page,
      totalPages: Math.ceil(totalRows[0].count / limit)
    };
  }

  static async exists(userId, jobPostId) {
    const [rows] = await db.execute(
      'SELECT id FROM Bookmark WHERE user_id = ? AND job_post_id = ?',
      [userId, jobPostId]
    );
    return rows.length > 0;
  }
}

module.exports = Bookmark;