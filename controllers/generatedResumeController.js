const GeneratedResume = require('../models/GeneratedResume');
const { generateResume, updateResume } = require('../middleware/genAiPrompts');

// Get all Generated resumes
const getGeneratedResumes = async (req, res) => {
  try {
    const GeneratedResumes = await GeneratedResume.find({ user: req.user._id });
    res.json(GeneratedResumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Generated resumes', error });
  }
};

// Create a new Generated resume
const createGeneratedResume = async (req, res) => {
  try {
    const { originalCvContent, companyWebsite, jobDescriptionUrl } = req.body;

    
    const GeneratedResumeContent = await generateResume(originalCvContent, companyWebsite, jobDescriptionUrl);
    

    const GeneratedResume = new GeneratedResume({
      user: req.user._id,
      originalCvContent,
      GeneratedResumeContent,
      companyWebsite,
      jobDescriptionUrl
    });

    console.log('Generated resume:', GeneratedResume);
    const createdGeneratedResume = await GeneratedResume.save();
    res.status(201).json(createdGeneratedResume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Generated resume', error });
  }
};

// Get a Generated resume by ID
const getGeneratedResumeById = async (req, res) => {
  try {
    const GeneratedResume = await GeneratedResume.findById(req.params.id);

    if (GeneratedResume) {
      console.log('Found Generated resume:');
      res.json(GeneratedResume);
    } else {
      console.log('Generated resume not found');
      res.status(404).json({ message: 'Generated resume not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Generated resume', error });
  }
};

// Update a Generated resume by ID
const updateGeneratedResume = async (req, res) => {
  try {
    const { originalCvContent, GeneratedResumeContent, companyWebsite, jobDescriptionUrl, additionalComments } = req.body;
    
    const generatedResumeContent2 = await updateResume(originalCvContent, companyWebsite, jobDescriptionUrl, GeneratedResumeContent, additionalComments);
    
    const generatedResume = await GeneratedResume.findById(req.params.id);
    
    if (generatedResume) {
      generatedResume.originalCvContent = originalCvContent;
      generatedResume.generatedResumeContent = generatedResumeContent2;
      generatedResume.companyWebsite = companyWebsite;
      generatedResume.jobDescriptionUrl = jobDescriptionUrl;
      
      const updatedGeneratedResume = await generatedResume.save();
      res.json(updatedGeneratedResume);
    } else {
      res.status(404).json({ message: 'Generated resume not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Generated resume', error });
  }
};

// Delete a Generated resume by ID
const deleteGeneratedResume = async (req, res) => {
  try {
    const generatedResume = await GeneratedResume.findById(req.params.id);

    if (generatedResume) {
      await GeneratedResume.deleteOne({ _id: req.params.id });
      res.json({ message: 'Generated resume removed' });
    } else {
      res.status(404).json({ message: 'Generated resume not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Generated resume', error });
  }
};

module.exports = { getGeneratedResumes, createGeneratedResume, getGeneratedResumeById, updateGeneratedResume, deleteGeneratedResume };
