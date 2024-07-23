const mongoose  = require('mongoose');

const UploadedCVSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cvComments: { type: String },
    cvContent: { type: String },
    cvDateUploaded: { type: Date, default: Date.now },
    cvFileName: { type: String },
    });


const UploadedCV = mongoose.model('UploadedCV', UploadedCVSchema);
module.exports = UploadedCV;