const fs = require('fs');
const path = require('path');
const ImportService = require('../services/importService');

async function importJobs() {
  try {
    const filePath = path.join(__dirname, '../../data/jobs_data.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const result = await ImportService.importData(fileContent);
    console.log(result.message);
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    process.exit(1);
  }
}

importJobs();