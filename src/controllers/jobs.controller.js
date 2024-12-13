const JobPost = require('../models/job.model');
const ApiResponse = require('../utils/response');
const ErrorCodes = require('../constants/errorCodes');

exports.getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      title: req.query.title,
      company_id: req.query.company_id,
      closing_date: req.query.closing_date
    };

    const result = await JobPost.findAll(page, limit, filters);
    
    res.json(ApiResponse.success(
      { jobs: result.jobs },
      {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total
      }
    ));
  } catch (error) {
    res.status(500).json(ApiResponse.error(
      'Error fetching jobs',
      ErrorCodes.DATABASE_ERROR
    ));
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobPost.findById(jobId);
    
    if (!job) {
      return res.status(404).json(ApiResponse.error(
        'Job not found',
        ErrorCodes.NOT_FOUND
      ));
    }

    await JobPost.incrementViews(jobId);
    res.json(ApiResponse.success({ job }));
  } catch (error) {
    res.status(500).json(ApiResponse.error(
      'Error fetching job details',
      ErrorCodes.DATABASE_ERROR
    ));
  }
};