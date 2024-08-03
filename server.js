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
const genLetterRoutes = require('./routes/genLetterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://job-pro-khaki.vercel.app', 
  credentials:true,            
  optionSuccessStatus:200,
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 


// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/uploaded-cvs', uploadedCvRoutes);
app.use('/api/tailored-cvs', tailoredCvRoutes);
app.use('/api/gen-letters', genLetterRoutes);




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

