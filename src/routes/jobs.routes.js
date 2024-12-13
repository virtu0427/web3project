const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');

/**
 * @swagger
 * /jobs:
 *   get:
 *     tags: [Jobs]
 *     summary: Get all job posts with pagination and filters
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
 *         description: Number of items per page
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by job title
 *       - in: query
 *         name: company_id
 *         schema:
 *           type: integer
 *         description: Filter by company ID
 *       - in: query
 *         name: closing_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by closing date
 *     responses:
 *       200:
 *         description: List of job posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobPost'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/', jobsController.getAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     tags: [Jobs]
 *     summary: Get job post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job post ID
 *     responses:
 *       200:
 *         description: Job post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPost'
 *       404:
 *         description: Job post not found
 */
router.get('/:id', jobsController.getJobById);

module.exports = router;