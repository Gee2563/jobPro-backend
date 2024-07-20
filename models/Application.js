// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  pay: { type: String },
  jobDescription: { type: String },
  comments: { type: String },
  companyLinkedIn: { type: String },
  poiName: { type: String },
  poiLinkedIn: { type: String },
  extraInfo: { type: String },
  stage: { type: String, enum: ['research', 'active', 'applied', 'follow ups', 'interviewing', 'offers', 'reject/reviews'], default: 'research' },
  applicationDate: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
