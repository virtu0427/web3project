class DataTransformer {
  static transformJobData(record) {
    // 현재 날짜를 기본값으로 사용
    const now = new Date().toISOString().split('T')[0];
    
    return {
      title: record.title?.trim() || '',
      description: record.description?.trim() || '',
      posted_date: now, // 항상 유효한 날짜 사용
      closing_date: this.parseDate(record.deadline) || null,
      tech_stack: record.tech_stack?.trim() || '',
      experience: record.experience?.trim() || '',
      education: record.education?.trim() || '',
      employment_type: record.employment_type?.trim() || '',
      salary: record.salary?.trim() || '',
      address_main: record.address_main?.trim() || '',
      address_total: record.address_total?.trim() || ''
    };
  }

  static transformCompanyData(record) {
    return {
      name: record.company_name?.trim() || '',
      description: '',
      industry: record.job_group?.trim() || '',
      location: record.address_main?.trim() || '',
      website: record.url?.trim() || ''
    };
  }

  static parseDate(dateStr) {
    if (!dateStr) return null;
    
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      
      return date.toISOString().split('T')[0];
    } catch (error) {
      return null;
    }
  }
}

module.exports = DataTransformer;