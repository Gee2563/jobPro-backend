const UploadedCV = require('../models/UploadedCV');

// Get all uploaded CVs
const getUploadedCVs = async (req, res) => {
  try {
    console.log('Request from:', req.user._id);
    console.log('I have received your request for a CV');
    const uploadedCVs = await UploadedCV.find({ user: req.user._id });
    console.log('I have found your CVs:', uploadedCVs);
    res.json(uploadedCVs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploaded CVs', error });
  }
};

// If less than 3 CVs are uploaded, create a new CV
const createUploadedCV = async (req, res) => {
  console.log('Request from:', req.user._id);
  console.log('Creating new uploaded CV', req.body);
  try {
    const userUploadedCVs = await UploadedCV.find({ user: req.user._id })

    if (userUploadedCVs.length < 3) {
      
      const { cvComments, cvContent, cvFileName } = req.body;
      console.log('Creating new uploaded CV', req.body );

      const uploadedCV = new UploadedCV({
        user: req.user._id,
        cvComments: cvComments,
        cvContent: cvContent,
        cvFileName: cvFileName,
      });

      const createdUploadedCV = await uploadedCV.save();
      console.log('Successfully created uploaded CV')
      console.log('I have created your CV:', createdUploadedCV);
      res.status(201).json(createdUploadedCV);
    } else {
      res.status(400).json({ message: 'You can only upload 3 CVs' });
    }
  } catch (error) {
    console.log('Failed to create uploaded CV', error);
    res.status(500).json({ message: 'Failed to create uploaded CV', error });
  }
} 

// Get an uploaded CV by ID
const getUploadedCVById = async (req, res) => {
  try {
    const uploadedCV = await UploadedCV.findById(req.params.id);

    if (uploadedCV) {
      res.json(uploadedCV);
    } else {
      res.status(404).json({ message: 'Uploaded CV not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploaded CV', error });
  }
};

// Delete an uploaded CV
const deleteUploadedCV = async (req, res) => {
  try {
    const uploadedCV = await UploadedCV.findById(req.params.id);

    if (uploadedCV) {
      await UploadedCV.deleteOne({ _id: req.params.id });
      res.json({ message: 'Uploaded CV removed' });
    } else {
      res.status(404).json({ message: 'Uploaded CV not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete uploaded CV', error });
  }
}

module.exports = { getUploadedCVs, createUploadedCV, getUploadedCVById, deleteUploadedCV };
