const Application = require('../models/application.model');
const JobPost = require('../models/job.model');

exports.createApplication = async (req, res) => {
  try {
    const { jobPostId } = req.body;
    const userId = req.user.userId;

    // 채용공고 존재 확인
    const jobPost = await JobPost.findById(jobPostId);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // 이미 지원한 공고인지 확인
    const applications = await Application.findByUser(userId);
    const alreadyApplied = applications.some(app => app.job_post_id === jobPostId);
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const applicationId = await Application.create(userId, jobPostId);
    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application' });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const applications = await Application.findByUser(userId);
    
    res.json({
      applications,
      totalCount: applications.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    const deleted = await Application.delete(id, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application' });
  }
};