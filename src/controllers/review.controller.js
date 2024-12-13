const UserReview = require('../models/review.model');

exports.createReview = async (req, res) => {
  try {
    const { companyId, rating, comment } = req.body;
    const userId = req.user.userId;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this company
    const userReviews = await UserReview.findByUser(userId);
    const existingReview = userReviews.find(review => review.company_id === companyId);
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this company' });
    }

    const reviewId = await UserReview.create(userId, companyId, rating, comment);
    res.status(201).json({
      message: 'Review created successfully',
      reviewId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
};

exports.getCompanyReviews = async (req, res) => {
  try {
    const { companyId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const result = await UserReview.findByCompany(companyId, page, limit);
    const averageRating = await UserReview.getAverageRating(companyId);

    res.json({
      ...result,
      averageRating
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const review = await UserReview.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    await UserReview.update(id, rating, comment);
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const review = await UserReview.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await UserReview.delete(id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};