const { parse } = require('csv-parse');

class CSVParser {
  static async parseCSV(fileContent) {
    return new Promise((resolve, reject) => {
      const records = [];
      
      parse(fileContent, {
        columns: true,
        delimiter: ',',
        skip_empty_lines: true
      })
      .on('data', (record) => {
        records.push(record);
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
        resolve(records);
      });
    });
  }
}

module.exports = CSVParser;