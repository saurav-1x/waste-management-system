const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authMiddleware } = require('../middleware/auth');
const Complaint = require('../models/Complaint');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create complaint
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const locationObj = JSON.parse(location);
    
    const complaint = new Complaint({
      userId: req.user.id,
      name,
      location: locationObj,
      description,
      imagePath: req.file ? `/uploads/${req.file.filename}` : ''
    });
    
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating complaint' });
  }
});

// Get user's complaints
router.get('/my-complaints', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
});

// Cancel user's complaint
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.status === 'Cancelled') {
      return res.json(complaint);
    }

    if (complaint.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending complaints can be cancelled' });
    }

    complaint.status = 'Cancelled';
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling complaint' });
  }
});

module.exports = router;
