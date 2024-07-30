// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  jobTitle: { type: String, required: true },
  pay: { type: String },
  jobDescription: { type: String },
  comments: { type: String },
  companyLinkedIn: { type: String },
  poiName: { type: String },
  poiLinkedIn: { type: String },
  extraInfo: { type: String },
  stage: { type: String, enum: ['active/research', 'applied','interviewing', 'offers', 'reject/reviews'], default: 'active/research' },
  applicationDate: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
