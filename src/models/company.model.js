const db = require('../config/database');

class Company {
  static async create(data) {
    const { name, description, industry, location, website } = data;
    const [result] = await db.execute(
      'INSERT INTO Company (name, description, industry, location, website, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, description, industry, location, website]
    );
    return result.insertId;
  }

  static async findAll(page = 1, limit = 20, filters = {}) {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM Company WHERE 1=1';
    const params = [];

    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    if (filters.industry) {
      query += ' AND industry = ?';
      params.push(filters.industry);
    }

    query += ' ORDER BY name ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.execute(query, params);
    const [totalRows] = await db.execute('SELECT COUNT(*) as count FROM Company');
    
    return {
      companies: rows,
      total: totalRows[0].count,
      page,
      totalPages: Math.ceil(totalRows[0].count / limit)
    };
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Company WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { name, description, industry, location, website } = data;
    await db.execute(
      'UPDATE Company SET name = ?, description = ?, industry = ?, location = ?, website = ? WHERE id = ?',
      [name, description, industry, location, website, id]
    );
  }

  static async delete(id) {
    await db.execute('DELETE FROM Company WHERE id = ?', [id]);
  }

  static async getStats(id) {
    const [jobCount] = await db.execute(
      'SELECT COUNT(*) as count FROM JobPost WHERE company_id = ?',
      [id]
    );
    
    const [reviewStats] = await db.execute(`
      SELECT 
        COUNT(*) as reviewCount,
        AVG(rating) as averageRating
      FROM UserReview 
      WHERE company_id = ?`,
      [id]
    );

    return {
      activeJobPostings: jobCount[0].count,
      totalReviews: reviewStats[0].reviewCount,
      averageRating: reviewStats[0].averageRating || 0
    };
  }
}

module.exports = Company;