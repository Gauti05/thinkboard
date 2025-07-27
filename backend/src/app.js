require('dotenv').config(); 
const express = require('express');
const noteRoutes = require('./routes/noteRoutes');
const connectdb = require('./config/db');
const cors = require('cors');
const rateLimiter = require('./middlewear/rateLimiter');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectdb();

// CORS
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
}

app.set('trust proxy', 1);
// Middlewares
app.use(express.json());
// app.use('/api/', rateLimiter);
// app.use('/api', rateLimiter);
// app.use('/api/notes', noteRoutes);

app.use('/api', rateLimiter);        // ✅ Applies rate limiting to all /api/* routes
app.use('/api/notes', noteRoutes);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/mernboard/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/mernboard/dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});



//mongodb+srv://gautamrawat52002:uGK38xYqhqqlEY3c@cluster0.fxcmz4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0