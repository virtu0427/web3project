const db = require('../config/database');

class UserReview {
  static async create(userId, companyId, rating, comment) {
    const [result] = await db.execute(
      'INSERT INTO UserReview (user_id, company_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())',
      [userId, companyId, rating, comment]
    );
    return result.insertId;
  }

  static async findByCompany(companyId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(`
      SELECT r.*, u.username 
      FROM UserReview r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.company_id = ?
      ORDER BY r.created_at DESC
      LIMIT ? OFFSET ?`, 
      [companyId, limit, offset]
    );
    
    const [totalRows] = await db.execute(
      'SELECT COUNT(*) as count FROM UserReview WHERE company_id = ?',
      [companyId]
    );
    
    return {
      reviews: rows,
      total: totalRows[0].count,
      page,
      totalPages: Math.ceil(totalRows[0].count / limit)
    };
  }

  static async findByUser(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM UserReview WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM UserReview WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, rating, comment) {
    await db.execute(
      'UPDATE UserReview SET rating = ?, comment = ? WHERE id = ?',
      [rating, comment, id]
    );
  }

  static async delete(id) {
    await db.execute('DELETE FROM UserReview WHERE id = ?', [id]);
  }

  static async getAverageRating(companyId) {
    const [rows] = await db.execute(
      'SELECT AVG(rating) as average FROM UserReview WHERE company_id = ?',
      [companyId]
    );
    return rows[0].average || 0;
  }
}