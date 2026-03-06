require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/UserRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const uploadedCvRoutes = require('./routes/uploadedCvRoutes');
const tailoredCvRoutes = require('./routes/tailoredCvRoutes');
const genLetterRoutes = require('./routes/genLetterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.FRONTEND_ORIGINS || 'https://job-pro-khaki.vercel.app,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled request error:', err);
  res.status(500).json({ message: 'Internal server error' });
});


const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set');
  }

  mongoose.set('bufferCommands', false);
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log('MongoDB connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
