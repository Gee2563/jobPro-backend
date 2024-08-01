const express = require('express');
const {getGenLetters, createGenLetter, getGenLetterById, updateGenLetter, deleteGenLetter} = require('../controllers/genLetterController');
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/')
    .get(authenticateToken, getGenLetters)
    .post(authenticateToken, createGenLetter);

router.route('/:id')
    .get(authenticateToken, getGenLetterById)
    .put(authenticateToken, updateGenLetter)
    .delete(authenticateToken, deleteGenLetter);

module.exports = router;