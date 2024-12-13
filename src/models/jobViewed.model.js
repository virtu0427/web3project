const db = require('../config/database');

class JobViewed {
  static async create(userId, jobPostingId) {
    const [result] = await db.execute(
      'INSERT INTO JobViewed (user_id, job_posting_id, viewed_at) VALUES (?, ?, NOW())',
      [userId, jobPostingId]
    );
    return result.insertId;
  }

  static async findByUser(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(`
      SELECT jv.*, jp.title as job_title 
      FROM JobViewed jv 
      JOIN JobPost jp ON jv.job_posting_id = jp.id 
      WHERE jv.user_id = ?
      ORDER BY jv.viewed_at DESC
      LIMIT ? OFFSET ?`, 
      [userId, limit, offset]
    );
    
    const [totalRows] = await db.execute(
      'SELECT COUNT(*) as count FROM JobViewed WHERE user_id = ?',
      [userId]
    );
    
    return {
      viewedJobs: rows,
      total: totalRows[0].count,
      page,
      totalPages: Math.ceil(totalRows[0].count / limit)
    };
  }

  static async exists(userId, jobPostingId) {
    const [rows] = await db.execute(
      'SELECT id FROM JobViewed WHERE user_id = ? AND job_posting_id = ?',
      [userId, jobPostingId]
    );
    return rows.length > 0;
  }

  static async updateViewedAt(userId, jobPostingId) {
    await db.execute(
      'UPDATE JobViewed SET viewed_at = NOW() WHERE user_id = ? AND job_posting_id = ?',
      [userId, jobPostingId]
    );
  }
}