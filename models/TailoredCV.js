const mongoose = require('mongoose');

const TailoredCvSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalCvContent: { type: String, required: true },
    tailoredCvContent: { type: String },
    companyWebsite: { type: String, required: true },
    jobDescriptionUrl: { type: String, required: true },
    cvDateUploaded: { type: Date, default: Date.now }
});

const TailoredCv = mongoose.model('TailoredCv', TailoredCvSchema);
module.exports = TailoredCv;
