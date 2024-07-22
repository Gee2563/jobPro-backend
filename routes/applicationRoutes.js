const express = require('express');
const { getApplications, createApplication, updateApplication, deleteApplication, getApplicationById } = require('../controllers/applicationController');
const authenticateToken = require('../middleware/authMiddleware'); // Import your middleware
const router = express.Router();

//Once authenticated, the user can access the protected routes
//All applications
router.route('/')
  .get(authenticateToken, getApplications) // Use authenticateToken instead of protect
  .post(authenticateToken, createApplication); // Use authenticateToken instead of protect

//Single application
router.route('/:id')
  .get(authenticateToken, getApplicationById) // Use authenticateToken instead of protect
  .put(authenticateToken, updateApplication) // Use authenticateToken instead of protect
  .delete(authenticateToken, deleteApplication); // Use authenticateToken instead of protect

module.exports = router;
