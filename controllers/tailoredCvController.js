const { get } = require('mongoose');
const tailoredCV = require('../models/TailoredCV');
const {tailorCV,updateCV} = require('../middleware/genAiPrompts');




// Get all tailored CVs
const getTailoredCVs = async (req, res) => {
  const tailoredCVs = await tailoredCV.find({ user: req.user._id });
  res.json(tailoredCVs);
};

// Create a new tailored CV
const createTailoredCV = async (req, res) => {
  const { originalCvContent, companyWebsite, jobDescriptionUrl } = req.body;
  
  const tailoredCvContent = tailorCV(originalCvContent, companyWebsite, jobDescriptionUrl);

  const tailoredCv = new tailoredCV({
    user: req.user._id,
    originalCvContent, tailoredCvContent, companyWebsite, jobDescriptionUrl
  });

  const createdTailoredCV = await tailoredCv.save();
  res.status(201).json(createdTailoredCV);
};

// Get a tailored CV by ID
const getTailoredCVById = async (req, res) => {
  const tailoredCV = await tailoredCV.findById(req.params.id);

  if (tailoredCV) {
    res.json(tailoredCV);
  } else {
    res.status(404).json({ message: 'Tailored CV not found' });
  }
};

// Update a tailored CV by ID

const updateTailoredCV = async (req, res) => {
    const { originalCvContent, tailoredCvContent, companyWebsite, jobDescriptionUrl, additionalComments } = req.body;
    
    const tailoredCvContent2 = updateCV(originalCvContent, companyWebsite, jobDescriptionUrl, tailoredCvContent, additionalComments);
    
    const tailoredCV = await tailoredCV.findById(req.params.id);
    
    if (tailoredCV) {
        tailoredCV.originalCvContent = originalCvContent;
        tailoredCV.tailoredCvContent = tailoredCvContent2;
        tailoredCV.companyWebsite = companyWebsite;
        tailoredCV.jobDescriptionUrl = jobDescriptionUrl;
        const updatedTailoredCV = await tailoredCV.save();
        res.json(updatedTailoredCV);
    } else {
        res.status(404).json({ message: 'Tailored CV not found' });
    }
    };

// Delete a tailored CV by ID
const deleteTailoredCV = async (req, res) => {
  const tailoredCV = await tailoredCV.findById(req.params.id);

  if (tailoredCV) {
    await tailoredCV.remove();
    res.json({ message: 'Tailored CV removed' });
  } else {
    res.status(404).json({ message: 'Tailored CV not found' });
  }
};

module.exports = { getTailoredCVs, createTailoredCV, getTailoredCVById, updateTailoredCV, deleteTailoredCV };