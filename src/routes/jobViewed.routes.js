const express = require('express');
const router = express.Router();
const jobViewedController = require('../controllers/jobViewed.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: JobViewed
 *   description: Job view history management
 */

/**
 * @swagger
 * /job-views:
 *   post:
 *     tags: [JobViewed]
 *     summary: Record a job view
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobPostingId
 *             properties:
 *               jobPostingId:
 *                 type: integer
 *                 description: ID of the viewed job posting
 *     responses:
 *       201:
 *         description: Job view recorded successfully
 *       200:
 *         description: Job view timestamp updated
 *       404:
 *         description: Job posting not found
 *       401:
 *         description: Unauthorized
 *   
 *   get:
 *     tags: [JobViewed]
 *     summary: Get user's viewed jobs history
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
 *         description: List of viewed jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewedJobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobViewed'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */

router.post('/', jobViewedController.recordJobView);
router.get('/', jobViewedController.getViewedJobs);

module.exports = router;