const db = require('../config/database');
const CSVParser = require('../utils/csvParser');
const DataTransformer = require('../utils/dataTransformer');

class ImportService {
  static async importData(fileContent) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();

      const records = await CSVParser.parseCSV(fileContent);
      
      // 회사 정보 처리
      const companyMap = new Map();
      for (const record of records) {
        if (!companyMap.has(record.company_name)) {
          const companyData = DataTransformer.transformCompanyData(record);
          const [result] = await connection.execute(
            'INSERT INTO Company (name, description, industry, location, website) VALUES (?, ?, ?, ?, ?)',
            [companyData.name, companyData.description, companyData.industry, companyData.location, companyData.website]
          );
          companyMap.set(record.company_name, result.insertId);
        }
      }

      // 채용공고 정보 처리
      for (const record of records) {
        const jobData = DataTransformer.transformJobData(record);
        const company_id = companyMap.get(record.company_name);

        await connection.execute(`
          INSERT INTO JobPost (
            title, description, posted_date, closing_date, company_id,
            tech_stack, experience, education, employment_type, salary,
            address_main, address_total
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          jobData.title,
          jobData.description,
          jobData.posted_date,
          jobData.closing_date,
          company_id,
          jobData.tech_stack,
          jobData.experience,
          jobData.education,
          jobData.employment_type,
          jobData.salary,
          jobData.address_main,
          jobData.address_total
        ]);
      }

      await connection.commit();
      return { success: true, message: '데이터 가져오기 완료' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = ImportService;