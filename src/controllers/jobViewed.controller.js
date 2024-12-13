const JobViewed = require('../models/jobViewed.model');
const JobPost = require('../models/job.model');

exports.recordJobView = async (req, res) => {
  try {
    const { jobPostingId } = req.body;
    const userId = req.user.userId;

    // Check if job exists
    const job = await JobPost.findById(jobPostingId);
    if (!job) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    // Check if already viewed
    const exists = await JobViewed.exists(userId, jobPostingId);
    if (exists) {
      // Update viewed_at timestamp
      await JobViewed.updateViewedAt(userId, jobPostingId);
      return res.json({ message: 'Job view timestamp updated' });
    }

    // Create new view record
    await JobViewed.create(userId, jobPostingId);
    res.status(201).json({ message: 'Job view recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording job view' });
  }
};

exports.getViewedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const result = await JobViewed.findByUser(userId, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching viewed jobs' });
  }
};