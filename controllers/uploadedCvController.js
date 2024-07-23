const { get } = require('mongoose');
const UploadedCV = require('../models/UploadedCV');

// Get all uploaded CVs
const getUploadedCVs = async (req, res) => {
  const uploadedCVs = await UploadedCV.find({ user: req.user._id });
  res.json(uploadedCVs);
};

// If less than 3 CVs are uploaded, create a new CV
const createUploadedCV = async (req, res) => {
    if (getUploadedCVs.length < 3) {
      const { cvComments, cvContent, cvFileName } = req.body;
    
      const uploadedCV = new UploadedCV({
        user: req.user._id,
        cvComments, cvContent, cvFileName,
      });
    
      const createdUploadedCV = await uploadedCV.save();
      res.status(201).json(createdUploadedCV);
    } else {
        res.status(400).json({ message: 'You can only upload 3 CVs' });
        }
}

// Get an uploaded CV by ID
const getUploadedCVById = async (req, res) => {
  const uploadedCV = await UploadedCV.findById(req.params.id);

  if (uploadedCV) {
    res.json(uploadedCV);
  } else {
    res.status(404).json({ message: 'Uploaded CV not found' });
  }
};

// delete an uploaded CV
const deleteUploadedCV = async (req, res) => {
  const uploadedCV = await UploadedCV.findById(req.params.id);

  if (uploadedCV) {
    await uploadedCV.remove();
    res.json({ message: 'Uploaded CV removed' });
  } else {
    res.status(404).json({ message: 'Uploaded CV not found' });
  }
};

module.exports = { getUploadedCVs, createUploadedCV, getUploadedCVById, deleteUploadedCV };
