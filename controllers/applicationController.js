// controllers/applicationController.js
const Application = require('../models/application');

// Get all applications
const getApplications = async (req, res) => {
  console.log('Request from:', req.user._id);
  console.log('I have received your request');
  try {
    const applications = await Application.find({ user: req.user._id });
    console.log('I should send this: ', applications.map(app => app.user));
    res.json(applications);
  } catch (error) {
    console.error('Error retrieving applications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new application
const createApplication = async (req, res) => {
  console.log('Request from:', req.user._id);
  console.log('I have received your request to create an application');
  const {
    companyName, companyWebsite, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage, location, remoteOnsite, tailoredCv, genLetter,
    jobUrl,
  } = req.body;

  const application = new Application({
    user: req.user._id,
    companyName, companyWebsite, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage, location, remoteOnsite, tailoredCv, genLetter, jobUrl,
  });

  const createdApplication = await application.save();
  res.status(201).json(createdApplication);
};

// Get an application by ID
const getApplicationById = async (req, res) => {
  const application = await Application.findById(req.params.id);
  console.log('I have received your request', application);

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
    extraInfo, stage, location, remoteOnsite, tailoredCv, genLetter,
    jobUrl,
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
    application.location = location || application.location;
    application.remoteOnsite = remoteOnsite || application.remoteOnsite;
    application.tailoredCv = tailoredCv || application.tailoredCv;
    application.genLetter = genLetter || application.genLetter;
    application.jobUrl = jobUrl || application.jobUrl;  


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

// Update application stage
const updateApplicationStage = async (req, res) => {
  const { stage } = req.body;

  const application = await Application.findById(req.params.id);

  if (application) {
    application.stage = stage || application.stage;

    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
}


module.exports = { getApplications, createApplication, getApplicationById, updateApplication, deleteApplication, updateApplicationStage };
