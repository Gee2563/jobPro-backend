// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  location : { type: String },
  remoteOnsite: { type: String, enum: ['remote', 'onsite', 'both'], default: 'remote' },
  jobTitle: { type: String, required: true },
  tailoredCv: {type:mongoose.Schema.Types.ObjectId, ref: 'TailoredCv'},
  GenLetter: {type:mongoose.Schema.Types.ObjectId, ref: 'GenLetter'},
  pay: { type: String },
  jobDescription: { type: String },
  jobUrl: { type: String },
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
