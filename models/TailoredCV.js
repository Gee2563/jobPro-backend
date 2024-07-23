const mongoose  = require('mongoose');

const TailoredCvSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalCvContent: { type: String },
    tailoredCvContent: { type: String },
    cvDateUploaded: { type: Date, default: Date.now }
    });


const TailoredCv = mongoose.model('TailoredCV', TailoredCvSchema);
module.exports = TailoredCv;