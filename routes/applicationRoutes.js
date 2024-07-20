// routes/applicationRoutes.js
const express = require('express');
const { getApplications, createApplication, updateApplication, deleteApplication, getApplicationById } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getApplications).post(protect, createApplication);
router.route('/:id').get(protect, getApplicationById).put(protect, updateApplication).delete(protect, deleteApplication);

module.exports = router;
