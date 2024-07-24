const mongoose = require('mongoose');

const UploadedCVSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cvComments: { type: String, required: true },
    cvContent: { type: String, required: true },
    cvFileName: { type: String, required: true },
    cvDateUploaded: { type: Date, default: Date.now }
});

const UploadedCV = mongoose.model('UploadedCV', UploadedCVSchema);
module.exports = UploadedCV;
