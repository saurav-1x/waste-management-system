const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const Complaint = require('./models/Complaint');

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Waste Management API is running',
    frontend: 'http://127.0.0.1:5173',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      complaints: 'GET/POST /api/complaints'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Complaints Dashboard UI
app.get('/dashboard', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.render('complaints', { complaints });
  } catch (error) {
    res.status(500).render('complaints', { complaints: [], error: 'Error loading complaints' });
  }
});

// Admin Dashboard UI
app.get('/admin', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.render('admin', { complaints });
  } catch (error) {
    res.status(500).render('admin', { complaints: [], error: 'Error loading complaints' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
