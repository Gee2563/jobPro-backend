// controllers/applicationController.js
const Application = require('../models/application');

// Get all applications
const getApplications = async (req, res) => {
  const applications = await Application.find({ user: req.user._id });
  res.json(applications);
};

// Create a new application
const createApplication = async (req, res) => {
  const {
    companyName, companyWebsite, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage,
  } = req.body;

  const application = new Application({
    user: req.user._id,
    companyName, companyWebsite, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage,
  });

  const createdApplication = await application.save();
  res.status(201).json(createdApplication);
};

// Get an application by ID
const getApplicationById = async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

// Update an application
const updateApplication = async (req, res) => {
  const {
    companyName, companyWebsite, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage,
  } = req.body;

  const application = await Application.findById(req.params.id);

  if (application) {
    application.companyName = companyName || application.companyName;
    application.companyWebsite = companyWebsite || application.companyWebsite;
    application.jobTitle = jobTitle || application.jobTitle;
    application.pay = pay || application.pay;
    application.jobDescription = jobDescription || application.jobDescription;
    application.comments = comments || application.comments;
    application.companyLinkedIn = companyLinkedIn || application.companyLinkedIn;
    application.poiName = poiName || application.poiName;
    application.poiLinkedIn = poiLinkedIn || application.poiLinkedIn;
    application.extraInfo = extraInfo || application.extraInfo;
    application.stage = stage || application.stage;

    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    await Application.deleteOne({ _id: req.params.id });
    res.json({ message: 'Application removed' });
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

module.exports = { getApplications, createApplication, getApplicationById, updateApplication, deleteApplication };
