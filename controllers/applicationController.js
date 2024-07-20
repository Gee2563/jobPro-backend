// controllers/applicationController.js
const Application = require('../models/application');

const getApplications = async (req, res) => {
  const applications = await Application.find({ user: req.user._id });
  res.json(applications);
};

const createApplication = async (req, res) => {
  const {
    companyName, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage,
  } = req.body;

  const application = new Application({
    user: req.user._id,
    companyName, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage,
  });

  const createdApplication = await application.save();
  res.status(201).json(createdApplication);
};

const getApplicationById = async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

const updateApplication = async (req, res) => {
  const {
    companyName, jobTitle, pay, jobDescription,
    comments, companyLinkedIn, poiName, poiLinkedIn,
    extraInfo, stage,
  } = req.body;

  const application = await Application.findById(req.params.id);

  if (application) {
    application.companyName = companyName || application.companyName;
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

const deleteApplication = async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    await application.remove();
    res.json({ message: 'Application removed' });
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

module.exports = { getApplications, createApplication, getApplicationById, updateApplication, deleteApplication };
