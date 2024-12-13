const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: User activity tracking endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserActivity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Activity ID
 *         user_id:
 *           type: integer
 *           description: User ID
 *         activity_type:
 *           type: string
 *           description: Type of activity (e.g., LOGIN, JOB_VIEW, APPLICATION_SUBMIT)
 *         details:
 *           type: object
 *           description: Additional activity details
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Activity timestamp
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     tags: [Activities]
 *     summary: Get user's activity history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of user activities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserActivity'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 * 
 * /activities/recent:
 *   get:
 *     tags: [Activities]
 *     summary: Get recent activities across all users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of recent activities to retrieve
 *     responses:
 *       200:
 *         description: List of recent activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/UserActivity'
 *                   - type: object
 *                     properties:
 *                       username:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */

router.use(authMiddleware);
router.get('/', activityController.getUserActivities);
router.get('/recent', activityController.getRecentActivities);

module.exports = router;