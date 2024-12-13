const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // 모든 지원 API에 인증 필요

router.post('/', applicationController.createApplication);
router.get('/', applicationController.getUserApplications);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;