const Bookmark = require('../models/bookmark.model');
const JobPost = require('../models/job.model');

exports.createBookmark = async (req, res) => {
  try {
    const { jobPostId } = req.body;
    const userId = req.user.userId;

    // 채용공고 존재 확인
    const jobPost = await JobPost.findById(jobPostId);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // 이미 북마크한 공고인지 확인
    const exists = await Bookmark.exists(userId, jobPostId);
    if (exists) {
      return res.status(400).json({ message: 'Already bookmarked this job' });
    }

    const bookmarkId = await Bookmark.create(userId, jobPostId);
    res.status(201).json({ 
      message: 'Bookmark created successfully',
      bookmarkId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating bookmark' });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const result = await Bookmark.findByUser(userId, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
};