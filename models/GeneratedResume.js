const mongoose = require('mongoose');

const GeneratedResumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalCvContent: { type: String, required: true },
    generatedCoverLetterContent: { type: String },
    companyWebsite: { type: String, required: true },
    jobDescriptionUrl: { type: String, required: true },
    cvDateUploaded: { type: Date, default: Date.now }
});

const GeneratedResume = mongoose.model('GeneratedResume', GeneratedResumeSchema);
module.exports = GeneratedResume;
