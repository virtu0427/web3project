const db = require('../config/database');

class UserActivity {
  static async create(userId, activityType, details) {
    const [result] = await db.execute(
      'INSERT INTO UserActivity (user_id, activity_type, details, created_at) VALUES (?, ?, ?, NOW())',
      [userId, activityType, JSON.stringify(details)]
    );
    return result.insertId;
  }

  static async findByUser(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(`
      SELECT * FROM UserActivity 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
    
    const [totalRows] = await db.execute(
      'SELECT COUNT(*) as count FROM UserActivity WHERE user_id = ?',
      [userId]
    );
    
    return {
      activities: rows.map(row => ({
        ...row,
        details: JSON.parse(row.details)
      })),
      total: totalRows[0].count,
      page,
      totalPages: Math.ceil(totalRows[0].count / limit)
    };
  }

  static async getRecentActivities(limit = 10) {
    const [rows] = await db.execute(`
      SELECT ua.*, u.username 
      FROM UserActivity ua 
      JOIN users u ON ua.user_id = u.id 
      ORDER BY ua.created_at DESC 
      LIMIT ?`,
      [limit]
    );
    
    return rows.map(row => ({
      ...row,
      details: JSON.parse(row.details)
    }));
  }
}