const GenLetter = require('../models/GenLetter');
const { generateLetter, updateLetter } = require('../middleware/genAiPrompts');

// Get all Cover Letters
const getGenLetters = async (req, res) => {
  try {
    const genLetters = await GenLetter.find({ user: req.user._id });
    res.json(genLetters);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Cover Letters', error });
  }
};

// Create a new Cover Letter
const createGenLetter = async (req, res) => {
  try {
    const { originalCvContent, companyWebsite, jobDescriptionUrl } = req.body;

    
    const genLetterContent = await generateLetter(originalCvContent, companyWebsite, jobDescriptionUrl);
    

    const genLetter = new GenLetter({
      user: req.user._id,
      originalCvContent,
      genLetterContent,
      companyWebsite,
      jobDescriptionUrl
    });

    console.log('Cover Letter:', genLetter);
    const createdGenLetter = await genLetter.save();
    res.status(201).json(createdGenLetter);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Cover Letter', error });
  }
};

// Get a Cover Letter by ID
const getGenLetterById = async (req, res) => {
  try {
    const genLetter = await GenLetter.findById(req.params.id);

    if (genLetter) {
      console.log('Found Cover Letter:');
      res.json(genLetter);
    } else {
      console.log('Cover Letter not found');
      res.status(404).json({ message: 'Cover Letter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Cover Letter', error });
  }
};

// Update a Cover Letter by ID
const updateGenLetter = async (req, res) => {
  try {
    const { originalCvContent, genLetterContent, companyWebsite, jobDescriptionUrl, additionalComments } = req.body;
    
    const genLetterContent2 = await updateLetter(originalCvContent, companyWebsite, jobDescriptionUrl, genLetterContent, additionalComments);
    
    const genLetter = await GenLetter.findById(req.params.id);
    
    if (genLetter) {
      genLetter.originalCvContent = originalCvContent;
      genLetter.genLetterContent = genLetterContent2;
      genLetter.companyWebsite = companyWebsite;
      genLetter.jobDescriptionUrl = jobDescriptionUrl;
      
      const updatedgenLetter = await genLetter.save();
      res.json(updatedgenLetter);
    } else {
      res.status(404).json({ message: 'Cover Letter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Cover Letter', error });
  }
};

// Delete a Cover Letter by ID
const deleteGenLetter = async (req, res) => {
  try {
    const genLetter = await GenLetter.findById(req.params.id);

    if (genLetter) {
      await GenLetter.deleteOne({ _id: req.params.id });
      res.json({ message: 'Cover Letter removed' });
    } else {
      res.status(404).json({ message: 'Cover Letter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Cover Letter', error });
  }
};

module.exports = { getGenLetters, createGenLetter, getGenLetterById, updateGenLetter, deleteGenLetter };
