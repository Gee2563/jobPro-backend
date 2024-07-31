require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
// need to implement cors 
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/UserRoutes')
const applicationRoutes = require('./routes/applicationRoutes');
const uploadedCvRoutes = require('./routes/uploadedCvRoutes');
const tailoredCvRoutes = require('./routes/tailoredCvRoutes');
const generatedResumeRoutes = require('./routes/generatedResumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/uploaded-cvs', uploadedCvRoutes);
app.use('/api/tailored-cvs', tailoredCvRoutes);
app.use('/api/generated-resumes', generatedResumeRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

