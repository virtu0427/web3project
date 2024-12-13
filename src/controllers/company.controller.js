const Company = require('../models/company.model');

exports.createCompany = async (req, res) => {
  try {
    const { name, description, industry, location, website } = req.body;
    
    if (!name || !industry) {
      return res.status(400).json({ message: 'Name and industry are required' });
    }

    const companyId = await Company.create({
      name,
      description,
      industry,
      location,
      website
    });

    res.status(201).json({
      message: 'Company created successfully',
      companyId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating company' });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      name: req.query.name,
      industry: req.query.industry
    };

    const result = await Company.findAll(page, limit, filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies' });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const stats = await Company.getStats(id);
    res.json({ ...company, stats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company details' });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, industry, location, website } = req.body;

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    await Company.update(id, {
      name,
      description,
      industry,
      location,
      website
    });

    res.json({ message: 'Company updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating company' });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    await Company.delete(id);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company' });
  }
};