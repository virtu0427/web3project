const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         industry:
 *           type: string
 *         location:
 *           type: string
 *         website:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         stats:
 *           type: object
 *           properties:
 *             activeJobPostings:
 *               type: integer
 *             totalReviews:
 *               type: integer
 *             averageRating:
 *               type: number
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     tags: [Companies]
 *     summary: Create a new company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - industry
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               industry:
 *                 type: string
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *   
 *   get:
 *     tags: [Companies]
 *     summary: Get all companies
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: industry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 companies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 * 
 * /companies/{id}:
 *   get:
 *     tags: [Companies]
 *     summary: Get company by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 *   
 *   put:
 *     tags: [Companies]
 *     summary: Update company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               industry:
 *                 type: string
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Company not found
 *   
 *   delete:
 *     tags: [Companies]
 *     summary: Delete company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Company not found
 */

// Public routes
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);

// Protected routes
router.use(authMiddleware);
router.post('/', companyController.createCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;