const express = require('express');
const { getUploadedCVs, createUploadedCV, getUploadedCVById, deleteUploadedCV } = require('../controllers/uploadedCvController');
const authenticateToken = require('../middleware/authMiddleware'); // Import your middleware
const { route } = require('./applicationRoutes');
const router = express.Router();

// Once authenticated, the user can access the protected routes

// All uploaded CVs
router.route('/')
    .get(authenticateToken, getUploadedCVs) 
    .post(authenticateToken, createUploadedCV);

// Single uploaded CV
router.route('/:id')
    .get(authenticateToken, getUploadedCVById) 
    .delete(authenticateToken, deleteUploadedCV);

module.exports = router;

