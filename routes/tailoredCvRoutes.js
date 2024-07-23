const express = require('express');
const { getTailoredCVs, createTailoredCV, getTailoredCVById, updateTailoredCV, deleteTailoredCV } = require('../controllers/tailoredCvController');
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/')
    .get(authenticateToken, getTailoredCVs)
    .post(authenticateToken, createTailoredCV);

router.route('/:id')
    .get(authenticateToken, getTailoredCVById)
    .put(authenticateToken, updateTailoredCV)
    .delete(authenticateToken, deleteTailoredCV);

module.exports = router;