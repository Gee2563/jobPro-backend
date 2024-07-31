const express = require('express');
const { getGeneratedResumes, createGeneratedResume, getGeneratedResumeById, updateGeneratedResume, deleteGeneratedResume } = require('../controllers/generatedResumeController');
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/')
    .get(authenticateToken, getGeneratedResumes)
    .post(authenticateToken, createGeneratedResume);

router.route('/:id')
    .get(authenticateToken, getGeneratedResumeById)
    .put(authenticateToken, updateGeneratedResume)
    .delete(authenticateToken, deleteGeneratedResume);

module.exports = router;