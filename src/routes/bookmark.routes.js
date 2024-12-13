const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Bookmark management endpoints
 */

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     tags: [Bookmarks]
 *     summary: Create a new bookmark
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobPostId
 *             properties:
 *               jobPostId:
 *                 type: integer
 *                 description: ID of the job post to bookmark
 *     responses:
 *       201:
 *         description: Bookmark created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bookmarkId:
 *                   type: integer
 *       400:
 *         description: Already bookmarked or invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job post not found
 *   
 *   get:
 *     tags: [Bookmarks]
 *     summary: Get user's bookmarks
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
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of user's bookmarks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */

router.use(authMiddleware);
router.post('/', bookmarkController.createBookmark);
router.get('/', bookmarkController.getBookmarks);

module.exports = router;