const express = require('express');
const { getApplications, createApplication, updateApplication, deleteApplication, getApplicationById , updateApplicationStage} = require('../controllers/applicationController');
const authenticateToken = require('../middleware/authMiddleware'); // Import your middleware
const router = express.Router();

//Once authenticated, the user can access the protected routes
//All applications
router.route('/')
  .get(authenticateToken, getApplications) 
  .post(authenticateToken, createApplication); 

//Single application
router.route('/:id')
  .get(authenticateToken, getApplicationById) 
  .put(authenticateToken, updateApplication) 
  .delete(authenticateToken, deleteApplication);
  
router.route('/stage/:id')
  .put(authenticateToken, updateApplicationStage);
  
module.exports = router;
