// This model is used to generate AI prompts for the user to create a cover letter and store in DB

const mongoose = require("mongoose");

const GenLetterSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalCvContent: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    jobDescriptionUrl: { type: String, required: true },
    DateUploaded: { type: Date, default: Date.now },
    genLetterContent: { type: String }, 
    });

const GenLetter = mongoose.model('GenLetter', GenLetterSchema);
module.exports = GenLetter;

