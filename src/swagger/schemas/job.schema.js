/**
 * @swagger
 * components:
 *   schemas:
 *     JobPost:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Job post ID
 *         title:
 *           type: string
 *           description: Job title
 *         description:
 *           type: string
 *           description: Job description
 *         posted_date:
 *           type: string
 *           format: date
 *           description: Date when the job was posted
 *         closing_date:
 *           type: string
 *           format: date
 *           description: Application closing date
 *         company_id:
 *           type: integer
 *           description: ID of the company posting the job
 *       required:
 *         - title
 *         - description
 *         - posted_date
 *         - closing_date
 *         - company_id
 */