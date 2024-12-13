const db = require('../config/database');

class JobPost {
  static async findAll(page = 1, limit = 20, filters = {}) {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM JobPost WHERE 1=1';
    const params = [];

    if (filters.title) {
      query += ' AND title LIKE ?';
      params.push(`%${filters.title}%`);
    }

    if (filters.company_id) {
      query += ' AND company_id = ?';
      params.push(filters.company_id);
    }

    if (filters.closing_date) {
      query += ' AND closing_date >= ?';
      params.push(filters.closing_date);
    }

    query += ' ORDER BY posted_date DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.execute(query, params);
    const [totalRows] = await db.execute('SELECT COUNT(*) as count FROM JobPost');
    
    return {
      jobs: rows,
      total: totalRows[0].count,
      page,
      totalPages: Math.ceil(totalRows[0].count / limit)
    };
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM JobPost WHERE id = ?', [id]);
    return rows[0];
  }

  static async incrementViews(id) {
    await db.execute('UPDATE JobPost SET views = views + 1 WHERE id = ?', [id]);
  }
}

module.exports = JobPost;