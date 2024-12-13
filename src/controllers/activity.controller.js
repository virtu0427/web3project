const UserActivity = require('../models/activity.model');

exports.getUserActivities = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const result = await UserActivity.findByUser(userId, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user activities' });
  }
};

exports.getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const activities = await UserActivity.getRecentActivities(limit);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent activities' });
  }
};