const TailoredCV = require('../models/TailoredCV');
const { tailorCV, updateCV } = require('../middleware/genAiPrompts');

// Get all tailored CVs
const getTailoredCVs = async (req, res) => {
  try {
    const tailoredCVs = await TailoredCV.find({ user: req.user._id });
    res.json(tailoredCVs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tailored CVs', error });
  }
};

// Create a new tailored CV
const createTailoredCV = async (req, res) => {
  try {
    const { originalCvContent, companyWebsite, jobDescriptionUrl } = req.body;

    
    const tailoredCvContent = await tailorCV(originalCvContent, companyWebsite, jobDescriptionUrl);
    

    const tailoredCv = new TailoredCV({
      user: req.user._id,
      originalCvContent,
      tailoredCvContent,
      companyWebsite,
      jobDescriptionUrl
    });

    console.log('Tailored CV:', tailoredCv);
    const createdTailoredCV = await tailoredCv.save();
    res.status(201).json(createdTailoredCV);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create tailored CV', error });
  }
};

// Get a tailored CV by ID
const getTailoredCVById = async (req, res) => {
  try {
    const tailoredCV = await TailoredCV.findById(req.params.id);

    if (tailoredCV) {
      console.log('Found tailored CV:');
      res.json(tailoredCV);
    } else {
      console.log('Tailored CV not found');
      res.status(404).json({ message: 'Tailored CV not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tailored CV', error });
  }
};

// Update a tailored CV by ID
const updateTailoredCV = async (req, res) => {
  try {
    const { originalCvContent, tailoredCvContent, companyWebsite, jobDescriptionUrl, additionalComments } = req.body;
    
    const tailoredCvContent2 = await updateCV(originalCvContent, companyWebsite, jobDescriptionUrl, tailoredCvContent, additionalComments);
    
    const tailoredCV = await TailoredCV.findById(req.params.id);
    
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to update tailored CV', error });
  }
};

// Delete a tailored CV by ID
const deleteTailoredCV = async (req, res) => {
  try {
    const tailoredCV = await TailoredCV.findById(req.params.id);

    if (tailoredCV) {
      await TailoredCV.deleteOne({ _id: req.params.id });
      res.json({ message: 'Tailored CV removed' });
    } else {
      res.status(404).json({ message: 'Tailored CV not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete tailored CV', error });
  }
};

module.exports = { getTailoredCVs, createTailoredCV, getTailoredCVById, updateTailoredCV, deleteTailoredCV };
